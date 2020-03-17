const express = require('express');
const resource_controller = require('./resource.controller');

const resource_router = express.Router();

/**
 * ruta que permite el registro de un recurso.
 */
resource_router.post('/', resource_controller.create);

/**
 * ruta que permite el registro una noticia.
 */
resource_router.get('/', resource_controller.list);

module.exports = resource_router;