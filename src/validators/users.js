const { check } = require('express-validator');
const { validator } = require('../middlewares/validate');

const ValidateUser = [
  check('username')
    .isString()
    .trim()
    .withMessage('Please enter a valid username')
    .optional(),
  check('email')
    .isString()
    .isEmail()
    .trim()
    .withMessage('Please enter a valid email')
    .optional(),
  check('password')
    .isString()
    .trim()
    .withMessage('Please enter a valid password')
    .optional(),

  (req, res, next) => {
    validator(req, res, next);
  },
];

module.exports = {
  ValidateUser,
};
