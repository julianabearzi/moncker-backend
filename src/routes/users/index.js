const express = require('express');
const { body } = require('express-validator');
const usersController = require('../../controllers/users');

const router = express.Router();
const { validator } = require('../../middlewares/validate');
const { ValidateUser } = require('../../validators/users');

router.route('/').get(usersController.getAllUsers);
router.route('/register').post(ValidateUser, usersController.createUser);
router
  .route('/login')
  .post(
    body('email', 'Invalid email').isString().isEmail().trim()
      .notEmpty(),
    body('password', 'Invalid password').isString().trim().notEmpty(),
    validator,
    usersController.loginUser,
  );

module.exports = router;
