const express = require('express');
const users = require('./users');

const router = express.Router();

router.use('/api/users', users);

module.exports = router;
