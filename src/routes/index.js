const express = require('express');
const users = require('./users');
const income = require('./income');
const expenses = require('./expenses');

const router = express.Router();

router.use('/api/users', users);
router.use('/api/income', income);
router.use('/api/expenses', expenses);

module.exports = router;
