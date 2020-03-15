const express = require('express');
const user_controller = require('./user.controller');

const user_router = express.Router();

/**
 * ruta que permite el registro de un nuevo usuario.
 */
user_router.post('/', user_controller.create);

/**
 * ruta que permite listar todos los usuarios cuyas solicitudes aún no han sido aprobadas.
 */
user_router.get('/', user_controller.listPending);

module.exports = user_router;
