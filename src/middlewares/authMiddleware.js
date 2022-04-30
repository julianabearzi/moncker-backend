/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ ok: false });
  }

  try {
    const { _id, email } = jwt.verify(token, process.env.JWT_KEY);

    req._id = _id;
    req.email = email;
  } catch (error) {
    return res.status(401).json();
  }
  next();
};

module.exports = {
  authMiddleware,
};
