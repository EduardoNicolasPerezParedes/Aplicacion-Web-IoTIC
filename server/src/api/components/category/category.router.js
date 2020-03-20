const express = require('express');
const category_controller = require('./category.controller');

const category_router = express.Router();

/**
 * ruta que permite registrar una nueva categoría.
 */
category_router.post('/', category_controller.create);

/**
 * ruta que permite listar las categorías registradas.
 */
category_router.get('/', category_controller.list);

/**
 * ruta que permite listar las categorías registradas.
 */
category_router.delete('/:id', category_controller.delete);

/**
 * ruta que permite obtener una categoría.
 */
category_router.get('/:id', category_controller.get);

/**
 * ruta que permite actualizar una categoría.
 */
category_router.put('/:id', category_controller.update);

module.exports = category_router;
