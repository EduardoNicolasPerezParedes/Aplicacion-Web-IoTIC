const express = require('express');
const vision_controller = require('./vision.controller');

const vision_router = express.Router();

/**
 * ruta que permite registrar la visión del semillero
 */
vision_router.post('/create', vision_controller.createVision);

/**
 * ruta que permite actualizar la visión del semillero
 */
vision_router.put('/update', vision_controller.updateVision);

/**
 * ruta que permite obtener la visión del semillero
 */
vision_router.get('/get', vision_controller.listVision);

module.exports = vision_router;