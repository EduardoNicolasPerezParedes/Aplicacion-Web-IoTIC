const express = require('express');
const event_controller = require('./event.controller');

const event_router = express.Router();

/**
 * ruta que permite crear un evento.
 */
event_router.post('/', event_controller.create);

/**
 * ruta que permite listar todos los eventos.
 */
event_router.get('/', event_controller.list);

/**
 * ruta que permite eliminar un evento.
 */
event_router.delete('/:id', event_controller.delete);

/**
 * ruta que permite obtener un evento.
 */
event_router.get('/:id', event_controller.get);

/**
 * ruta que permite actualizar un evento.
 */
event_router.put('/:id', event_controller.update);

module.exports = event_router;
