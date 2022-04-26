const express = require('express');
const usersController = require('../../controllers/users');

const router = express.Router();
const { ValidateUser } = require('../../validators/users');

router.route('/register').post(ValidateUser, usersController.createUser);
router.route('/').get(usersController.getAllUsers);

module.exports = router;
