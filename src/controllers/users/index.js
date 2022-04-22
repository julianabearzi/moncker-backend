const Users = require('../../model/Users');

const createUser = async (req, res) => {
  try {
    const userExists = await Users.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        error: true,
        msg: 'User already exists',
      });
    }
    if (!req.body.username || !req.body.email || !req.body.password) {
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

module.exports = {
  createUser,
};
