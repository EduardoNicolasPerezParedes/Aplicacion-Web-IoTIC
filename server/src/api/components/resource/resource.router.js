const express = require('express');
const resource_controller = require('./resource.controller');

const resource_router = express.Router();

/**
 * ruta que permite el registro de un recurso.
 */
resource_router.post('/', resource_controller.create);

/**
 * ruta que permite listar los recursos registrados.
 */
resource_router.get('/', resource_controller.list);

/**
 * ruta que permite el registro una noticia.
 */
resource_router.get('/:id', resource_controller.get);

module.exports = resource_router;