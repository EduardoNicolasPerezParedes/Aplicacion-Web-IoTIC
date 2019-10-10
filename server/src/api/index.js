const express = require('express');
const rest_router = express.Router();
const user_router = require('./components/user');

rest_router.use('/user', user_router);

module.exports = rest_router;