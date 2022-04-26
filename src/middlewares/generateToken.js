const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '15d' });

module.exports = {
  generateToken,
};
