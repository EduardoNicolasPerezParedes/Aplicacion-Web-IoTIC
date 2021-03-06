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
 * ruta que permite obtener un recurso.
 */
resource_router.get('/:id', resource_controller.get);

/**
 * ruta que permite obtener los recursos pertenecientes a una categoría.
 */
resource_router.get('/category/:category_id', resource_controller.get_by_category);

/**
 * ruta que permite actualizar un recurso.
 */
resource_router.put('/:id', resource_controller.update);

/**
 * ruta que permite eliminar un recurso.
 */
resource_router.delete('/:id', resource_controller.delete);

module.exports = resource_router;