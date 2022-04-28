const { check } = require('express-validator');
const { validator } = require('../middlewares/validate');

const ValidateExpense = [
  check('description')
    .isString()
    .matches(/^[A-Za-z\s]+$/)
    .trim()
    .withMessage('Please enter a valid description')
    .optional(),
  check('amount')
    .isNumeric()
    .trim()
    .withMessage('Please enter a valid amount')
    .optional(),
  check('category')
    .trim()
    .custom((value) => {
      if (
        value === 'Food'
        || value === 'Bills & utilities'
        || value === 'Entertainment'
        || value === 'Transportation'
        || value === 'Health & personal care'
        || value === 'Personal Spending'
        || value === 'Housing'
        || value === 'Others'
      ) {
        return true;
      }
      throw new Error('Please enter a valid category');
    })
    .optional(),
  check('user')
    .isMongoId()
    .withMessage('Please enter a valid user ID')
    .trim()
    .exists()
    .not()
    .isEmpty(),

  (req, res, next) => {
    validator(req, res, next);
  },
];

module.exports = {
  ValidateExpense,
};
