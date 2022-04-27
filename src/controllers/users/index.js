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
    return res.status(201).json(newUser);
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
      res.status(200).json({
        _id: userFound?._id,
        firstname: userFound?.firstname,
        lastname: userFound?.lastname,
        email: userFound?.email,
        isAdmin: userFound?.isAdmin,
        token: generateToken(userFound?._id),
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

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
};
