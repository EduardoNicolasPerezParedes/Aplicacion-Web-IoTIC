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

module.exports = category_router;
