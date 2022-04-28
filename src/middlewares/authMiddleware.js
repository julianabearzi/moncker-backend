const jwt = require('jsonwebtoken');
const User = require('../model/Users');

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req?.headers?.authorization?.split(' ')[1];
    try {
      if (token) {
        const decodedUser = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decodedUser?.id);
        req.user = user;
        next();
      }
    } catch {
      return res.status(401).json({ msg: 'Not Authorized token expired' });
    }
  } else {
    return res
      .status(500)
      .json({ msg: 'There is no token attached to the header' });
  }
};

module.exports = {
  authMiddleware,
};
