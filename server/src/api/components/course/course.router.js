const express = require('express');
const course_controller = require('./course.controller');

const course_router = express.Router();

/**
 * ruta que permite el registro un nuevo curso.
 */
course_router.post('/', course_controller.create);

/**
 * ruta que permite obtener los cursos.
 */
course_router.get('/', course_controller.list);

module.exports = course_router;
