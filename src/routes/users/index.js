const express = require('express');
const { param, body } = require('express-validator');
const usersController = require('../../controllers/users');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const router = express.Router();
const { validator } = require('../../middlewares/validate');
const { ValidateUser } = require('../../validators/users');

router.route('/').get(authMiddleware, usersController.getAllUsers);
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
router.route('/profile').get(authMiddleware, usersController.userProfile);
router
  .route('/:id')
  .delete(
    authMiddleware,
    param('id').isMongoId(),
    ValidateUser,
    usersController.deleteUser,
  );
router
  .route('/:id')
  .put(
    authMiddleware,
    param('id').isMongoId(),
    ValidateUser,
    usersController.updateUser,
  );

module.exports = router;
