const { generateToken } = require('../../middlewares/generateToken');
const Users = require('../../model/Users');

const getAllUsers = async (req, res) => {
  try {
    const response = await Users.find();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const createUser = async (req, res) => {
  try {
    const userExists = await Users.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        error: true,
        msg: 'User already exists',
      });
    }
    if (
      !req.body.firstname
      || !req.body.lastname
      || !req.body.email
      || !req.body.password
    ) {
      return res.status(400).json({
        error: true,
        msg: 'Missing fields to create a user',
      });
    }
    const user = new Users(req.body);
    const newUser = await user.save();
    const token = await generateToken(newUser._id, newUser.email);
    return res.status(201).json({
      _id: newUser?._id,
      firstname: newUser?.firstname,
      lastname: newUser?.lastname,
      email: newUser?.email,
      isAdmin: newUser?.isAdmin,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req?.body;
    const userFound = await Users.findOne({
      email,
    });
    if (userFound && (await userFound?.isPasswordMatch(password))) {
      const token = await generateToken(userFound._id, userFound.email);
      res.status(200).json({
        _id: userFound?._id,
        firstname: userFound?.firstname,
        lastname: userFound?.lastname,
        email: userFound?.email,
        isAdmin: userFound?.isAdmin,
        token,
      });
    } else {
      res.status(401).json({ errors: ['Invalid Login Credentials'] });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const userProfile = async (req, res) => {
  try {
    const profile = await Users.findById(req?._id).populate([
      'expenses',
      'income',
    ]);
    res.json(profile);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const updateUser = async (req, res) => {
  try {
    if (
      req.body.firstname === ''
      || req.body.lastname === ''
      || req.body.email === ''
      || req.body.password === ''
    ) {
      return res.status(400).json({
        error: true,
        msg: 'Missing fields to update user',
      });
    }
    const userUpdated = await Users.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );

    if (!userUpdated || userUpdated.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No user with the id ${req.params.id}`,
      });
    }

    return res.status(201).json(userUpdated);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userFound = await Users.findOneAndRemove({
      _id: req.params.id,
    });

    if (!userFound || userFound.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No user with the id ${req.params.id}`,
      });
    }

    return res.status(202).json(userFound);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const revalidateToken = async (req, res) => {
  const { _id, email } = req;
  const token = await generateToken(_id, email);

  res.json({
    _id,
    email,
    token,
  });
};

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
  userProfile,
  updateUser,
  deleteUser,
  revalidateToken,
};
