const express = require('express');
const loan_controller = require('./loan.controller');

const loan_router = express.Router();

/**
 * ruta que permite listar todos los prestamos.
 */
loan_router.get('/', loan_controller.list);

module.exports = loan_router;