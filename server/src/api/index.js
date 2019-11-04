const express = require('express');
const rest_router = express.Router();
const user_router = require('./components/user');
const auth_router = require('./components/auth');

rest_router.use('/user', user_router);
rest_router.use('/auth', auth_router);

module.exports = rest_router;