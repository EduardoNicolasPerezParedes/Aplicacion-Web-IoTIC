const express = require('express');
const news_controller = require('./news.controller');

const news_router = express.Router();

/**
 * ruta que permite el registro una noticia.
 */
news_router.post('/', news_controller.create);

/**
 * ruta que permite obtener las noticias.
 */
news_router.get('/', news_controller.list);

/**
 * ruta que permite obtener la información de una noticia.
 */
news_router.get('/:id', news_controller.get);

/**
 * ruta que permite eliminar una noticia.
 */
news_router.delete('/:id', news_controller.delete);
/**
 * ruta que permite actualizar un curso.
 */
news_router.put('/:id', news_controller.update);



module.exports = news_router;