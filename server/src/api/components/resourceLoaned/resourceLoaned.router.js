const express = require('express');
const resourceLoaned_controller = require('./resourceLoaned.controller');

const resourceLoaned_router = express.Router();

/**
 * ruta que permite el registro de los id asociados al prestamo
 */
//resourceLoaned_router.post('/', resource_controller.create);

/**
 * ruta que permite listar los id asociados a un prestamo
 */
resourceLoaned_router.get('/', resourceLoaned_controller.list);

/**
 * ruta que permite obtener los id asociados a un prestamo
 */
resourceLoaned_router.get('/:id', resourceLoaned_controller.get);

/**
 * ruta que permite obtener los identificadores de usuarios y prestamo
 */
resourceLoaned_router.get('/loan/:loan_id', resourceLoaned_controller.get_by_loanId);

/**
 * ruta que permite eliminar un resourceLoaned.
 */
resourceLoaned_router.delete('/:loanId', resourceLoaned_controller.delete);

/**
 * ruta que permite el registro un nuevo resourceLoaned.
 */
resourceLoaned_router.post('/', resourceLoaned_controller.create);

module.exports = resourceLoaned_router;