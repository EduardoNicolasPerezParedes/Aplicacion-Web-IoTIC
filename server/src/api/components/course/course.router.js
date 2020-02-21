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

/**
 * ruta que permite obtener la información de un curso.
 */
course_router.get('/:id', course_controller.get);

/**
 * ruta que permite eliminar un curso.
 */
course_router.delete('/:id', course_controller.delete);

/**
 * ruta que permite actualizar un curso.
 */
course_router.put('/:id', course_controller.update);


module.exports = course_router;
