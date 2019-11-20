const Course = require('./course.model');
const ERRORS = require('./course.errors');
const mongoose = require('mongoose');

const course_controller = {
    /**
     * Registra un nuevo curso, si y sólo si, todos los
     * atributos requeridos se encuentran dentro de la petición.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async create(req, res) {
        let name = req.body.name;
        let description = req.body.description;
        let teacher = req.body.teacher;
        let starts_at = req.body.starts_at;
        let ends_at = req.body.ends_at;

        if (!name) {
            // retorna error si el nombre del curso no se encuentra
            res.status(422).send({error: ERRORS.INVALID_NAME});
            return;
        }
        if (!description) {
            // retorna error si la descripción del curso no se encuentra
            res.status(422).send({error: ERRORS.INVALID_DESCRIPTION});
            return;
        }
        if (!teacher) {
            // retorna error si el instructor del curso no se encuentra
            res.status(422).send({error: ERRORS.INVALID_TEACHER});
            return;
        }
        if (!starts_at) {
            // retorna error si la fecha de inicio no se encuentra
            res.status(422).send({error: ERRORS.INVALID_START_DATE});
            return;
        }
        if (!ends_at) {
            // retorna error si la fecha de finalización no se encuentra
            res.status(422).send({error: ERRORS.INVALID_END_DATE});
            return;
        }

        let formated_name = name.toLowerCase();
        let course = await Course.findOne({name: formated_name}).exec();
        if (course) {
            // ya existe un curso con ese nombre
            res.status(422).send({error: ERRORS.NAME_ALREADY_TAKEN});
            return;
        }

        let new_course = await Course.create({
            name: name,
            description: description,
            teacher: teacher,
            starts_at: starts_at,
            ends_at: ends_at
        });

        res.status(200).send(new_course);
    },

    /**
     * Retorna todos los cursos.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async list(req, res) {
        let courses = await Course.find({});
        return res.status(200).json(courses);
    },

    /**
     * Retorna la información de un curso.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async get(req, res) {
        let id = req.params.id;

        try {
            mongoose.Types.ObjectId(id);
        } catch(err) {
            // retornar error si el id no es valido
            res.status(422).send({error: ERRORS.INVALID_COURSE});
            return;
        }
        
        let course = await Course.findOne({_id: id}).exec();

        if (!course) {
            // retornar error si el curso no se encuentra en la base de datos
            res.status(422).send({error: ERRORS.INVALID_COURSE});
            return;
        }

        res.status(200).send(course);
    }
}

module.exports = course_controller;