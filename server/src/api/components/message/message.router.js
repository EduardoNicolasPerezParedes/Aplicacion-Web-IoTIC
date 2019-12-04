const express = require('express');
const message_controller = require('./message.controller');

const message_router = express.Router();

/**
 * ruta que permite registrar un nuevo mensaje.
 */
message_router.post('/', message_controller.create);

/**
 * ruta que permite el obtener todos los mensajes.
 */
message_router.get('/', message_controller.list);

/**
 * ruta que permite eliminar un mensaje.
 */
message_router.delete('/:id', message_controller.delete);

module.exports = message_router;
