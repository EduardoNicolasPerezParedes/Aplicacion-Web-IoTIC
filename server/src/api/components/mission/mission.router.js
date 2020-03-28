const express = require('express');
const mission_controller = require('./mission.controller');

const mission_router = express.Router();

/**
 * ruta que permite registrar la misión del semillero
 */
mission_router.post('/create', mission_controller.createMission);

/**
 * ruta que permite actualizar la misión del semillero
 */
mission_router.put('/update', mission_controller.updateMission);

/**
 * ruta que permite obtener la misión del semillero
 */
mission_router.get('/get', mission_controller.listMission);

module.exports = mission_router;