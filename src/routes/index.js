const express = require('express');
const users = require('./users');
const income = require('./income');

const router = express.Router();

router.use('/api/users', users);
router.use('/api/income', income);

module.exports = router;
