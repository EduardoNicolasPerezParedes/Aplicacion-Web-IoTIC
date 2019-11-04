const express = require('express');
const auth_controller = require('./auth.controller');

const auth_router = express.Router();

/**
 * ruta que permite iniciar sesión a un usuario.
 */
auth_router.post('/', auth_controller.login);

module.exports = auth_router;
