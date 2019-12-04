const express = require('express');
const rest_router = express.Router();
const user_router = require('./components/user');
const auth_router = require('./components/auth');
const course_router = require('./components/course');
const message_router = require('./components/message');

rest_router.use('/user', user_router);
rest_router.use('/auth', auth_router);
rest_router.use('/course', course_router);
rest_router.use('/message', message_router);

module.exports = rest_router;