const express = require('express');
const { param } = require('express-validator');
const expenseController = require('../../controllers/expenses');

const router = express.Router();
const { validator } = require('../../middlewares/validate');
const { ValidateExpense } = require('../../validators/expenses');

router.route('/').get(expenseController.getAllExpenses);
router.route('/').post(ValidateExpense, expenseController.createExpense);
router
  .route('/:id')
  .get(param('id').isMongoId(), validator, expenseController.getExpenseById);
router
  .route('/:id')
  .delete(param('id').isMongoId(), validator, expenseController.deleteExpense);
router
  .route('/:id')
  .put(
    param('id').isMongoId(),
    ValidateExpense,
    expenseController.updateExpense,
  );

module.exports = router;
