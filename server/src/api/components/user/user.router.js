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
user_router.get('/pending', user_controller.listPending);

/**
 * ruta que permite listar todos los miembros del semillero
 */
user_router.get('/members', user_controller.listMembers);

/**
 * ruta que permite aceptar una solicitud de registro.
 */

/**
 * ruta que permite eliminar una solicitud de registro.
 */
user_router.delete('/delete/:id', user_controller.deletePending);


/**
 * ruta que permite obtener un usuario
 */
user_router.get('/:id', user_controller.get);
module.exports = user_router;
