const express = require('express');
const user_controller = require('./user.controller');

const user_router = express.Router();

/**
 * ruta que permite el registro de un nuevo usuario.
 */
user_router.post('/', user_controller.create);

module.exports = user_router;
