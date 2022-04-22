const express = require('express');
const users = require('./users');

const router = express.Router();

router.use('/register', users);

module.exports = router;
