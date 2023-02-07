const { check } = require('express-validator');
const { validator } = require('../middlewares/validate');

const ValidateSponsor = [
  check('name')
    .isString()
    .matches(/^[A-Za-z\s]+$/)
    .trim()
    .withMessage('Please enter a valid name')
    .optional(),
  check('phone')
    .isNumeric()
    .trim()
    .withMessage('Please enter a valid phone')
    .optional(),
  check('email')
    .isString()
    .isEmail()
    .trim()
    .withMessage('Please enter a valid email')
    .optional(),

  (req, res, next) => {
    validator(req, res, next);
  },
];

module.exports = {
  ValidateSponsor,
};
