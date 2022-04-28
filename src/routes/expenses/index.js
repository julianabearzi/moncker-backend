const express = require('express');
const { param } = require('express-validator');
const expenseController = require('../../controllers/expenses');

const router = express.Router();
const { validator } = require('../../middlewares/validate');
const { ValidateExpense } = require('../../validators/expenses');
const { authMiddleware } = require('../../middlewares/authMiddleware');

router.route('/').get(authMiddleware, expenseController.getAllExpenses);
router
  .route('/')
  .post(authMiddleware, ValidateExpense, expenseController.createExpense);
router
  .route('/:id')
  .get(
    authMiddleware,
    param('id').isMongoId(),
    validator,
    expenseController.getExpenseById,
  );
router
  .route('/:id')
  .delete(
    authMiddleware,
    param('id').isMongoId(),
    validator,
    expenseController.deleteExpense,
  );
router
  .route('/:id')
  .put(
    authMiddleware,
    param('id').isMongoId(),
    ValidateExpense,
    expenseController.updateExpense,
  );

module.exports = router;
