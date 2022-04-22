const express = require('express');
const usersController = require('../../controllers/users');

const router = express.Router();
const { ValidateUser } = require('../../validators/users');

router.route('/').post(ValidateUser, usersController.createUser);

module.exports = router;
