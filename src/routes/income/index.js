const express = require('express');
const { body } = require('express-validator');
const incomeController = require('../../controllers/income');

const router = express.Router();
const { validator } = require('../../middlewares/validate');

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

module.exports = router;
