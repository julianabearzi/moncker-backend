const express = require('express');
const { body, param } = require('express-validator');
const incomeController = require('../../controllers/income');

const router = express.Router();
const { validator } = require('../../middlewares/validate');
const { ValidateIncome } = require('../../validators/income');

router.route('/').get(incomeController.getAllIncome);
router
  .route('/')
  .post(
    body('description', 'Invalid description').isString().trim().notEmpty(),
    body('amount', 'Invalid password').isNumeric().trim().notEmpty(),
    body('user', 'Invalid user').isMongoId().trim().exists()
      .not()
      .isEmpty(),
    validator,
    incomeController.createIncome,
  );
router
  .route('/:id')
  .get(param('id').isMongoId(), validator, incomeController.getIncomeById);
router
  .route('/:id')
  .delete(param('id').isMongoId(), validator, incomeController.deleteIncome);
router
  .route('/:id')
  .put(param('id').isMongoId(), ValidateIncome, incomeController.updateIncome);

module.exports = router;
