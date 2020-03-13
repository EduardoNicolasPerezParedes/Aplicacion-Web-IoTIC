const express = require('express');
const file_controller = require('./file.controller');

const file_router = express.Router();

/**
 * ruta que permite subir un archivo.
 */
file_router.post('/', file_controller.upload);

/**
 * ruta que permite obtener un archivo.
 */
file_router.get('/:token', file_controller.get);

module.exports = file_router;
