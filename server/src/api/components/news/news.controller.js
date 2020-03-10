const News = require('./News.model');
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
        console.log(req.body)
        let title = req.body.title;
        let description = req.body.description;
        let development = req.body.development;
        let date = req.body.date;

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
        if (!development) {
            // retorna error si el desarrollo de la noticia no se encuentra
            res.status(422).send({error: ERRORS.INVALID_DEVELOPMENT});
            return;
        }
        if (!date) {
            // retorna error si la fecha de la noticia no se encuentra
            res.status(422).send({error: ERRORS.INVALID_DATE});
            return;
        }

        let formated_title = title.toLowerCase();
        let news = await News.findOne({title: formated_title}).exec();

        if (news) {
            // ya existe una noticia con ese nombre
            res.status(422).send({error: ERRORS.NAME_ALREADY_TAKEN});
            return;
        }

        let date_formated = new Date(date.year, date.month-1, date.day);
        let date_now = new Date();

        if (date_formated > date_now) {
            res.status(422).send({error: ERRORS.INVALID_DATE});
            return;
        }
        console.log("pasamos")

        let new_news = await News.create({
            title: title,
            description: description,
            development: development,
            date: date_formated,
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