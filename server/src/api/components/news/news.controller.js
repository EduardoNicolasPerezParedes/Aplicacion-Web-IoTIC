const News = require('./news.model');
const ERRORS = require('./news.errors');
const mongoose = require('mongoose');

const news_controller = {
    /**
     * Registra una nueva noticia, si y sólo si, todos los
     * atributos requeridos se encuentran dentro de la petición.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async create(req, res){
        let title = req.body.title;
        let description = req.body.description;

        if (!title) {
            // retorna error si el nombre de la noticia no se encuentra
            res.status(422).send({error: ERRORS.INVALID_TITLE});
            return;
        }
        if (!description) {
            // retorna error si la descripcion de la noticia no se encuentra
            res.status(422).send({error: ERRORS.INVALID_DESCRIPTION});
            return;
        }

        let formated_title = title.toLowerCase();
        let news = await News.findOne({title: formated_title}).exec();

        if (news) {
            // ya existe una noticia con ese nombre
            res.status(422).send({error: ERRORS.NAME_ALREADY_TAKEN});
            return;
        }

        let new_news = await News.create({
            title: title,
            description: description
        });

        res.status(200).send(new_news);
    },

    /**
     * Retorna todos las noticias.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async list(req, res) {
        let news = await News.find({});
        return res.status(200).json(news);
    },

    /**
     * Retorna la información de una noticia.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async get(req, res) {
        let id = req.params.id;

        try {
            mongoose.Types.ObjectId(id);
        } catch(err) {
            // retornar error si el id no es valido
            res.status(422).send({error: ERRORS.INVALID_NEWS});
            return;
        }
        
        let news = await News.findOne({_id: id}).exec();

        if (!news) {
            // retornar error si la noticia no se encuentra en la base de datos
            res.status(422).send({error: ERRORS.INVALID_NEWS});
            return;
        }

        res.status(200).send(news);
    },

    /**
     * Elimina una noticia.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async delete(req, res) {
        try {
            let id = req.params.id;

            await News.findByIdAndRemove({_id: id});

            res.sendStatus(200);
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    },

    
}


module.exports = news_controller;