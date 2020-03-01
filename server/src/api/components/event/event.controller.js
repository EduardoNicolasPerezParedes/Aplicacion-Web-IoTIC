const Event = require('./event.model');
const ERRORS = require('./evet.errors');

const event_controller = {
    /**
     * Agrega un nuevo evento. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async create(req, res) {
        try {
            let name = req.body.name;
            let description = req.body.description;
            let score = req.body.score;
            let date = req.body.date;

            if (!name) {
                // retorna error si el nombre del evento no se encuentra
                res.status(422).send(ERRORS.INVALID_NAME);
                return;
            }
            if (!description) {
                // retorna error si la descripción del evento no se encuentra
                res.status(422).send(ERRORS.INVALID_DESCRIPTION);
                return;
            }
            if (!score) {
                // retorna error si el score no se encuentra
                res.status(422).send(ERRORS.INVALID_SCORE);
                return;
            }
            if (!date) {
                // retorna error si la fecha no se encuentra
                res.status(422).send(ERRORS.INVALID_DATE);
                return;
            }

            if (Event.findOne({name: name})) {
                res.status(422).send(ERRORS.NAME_ALREADY_TAKEN);
                return;
            }

            let date_formated = new Date(date.year, date.month, date.day);

            let created = await Event.create({
                name: name,
                description: description,
                score: score,
                date: date_formated
            });
            res.status(200).send(created);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
     * Obtiene todos los eventos registrados.
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async list(req, res) {
        try {
            let events = await Event.find({});
            res.status(200).send(events);
        } catch (err) {
            res.status(200).send(err.message);
        }
    },
    /**
     * Elimina un evento
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async delete(req, res) {
        try {
            let id = req.params.id;

            await Event.findByIdAndRemove({_id: id});

            res.sendStatus(200);
        } catch (err) {
            res.status(200).send(err.message);
        }
    },
    /**
     * Actualiza un evento.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async update(req, res) {
        try {
            let id = req.params.id;
            let name = req.body.name;
            let description = req.body.description;
            let score = req.body.score;
            let date = req.body.date;

            if (!name) {
                // retorna error si el nombre del evento no se encuentra
                res.status(422).send({error: ERRORS.INVALID_NAME});
                return;
            }
            if (!description) {
                // retorna error si la descripción del evento no se encuentra
                res.status(422).send({error: ERRORS.INVALID_DESCRIPTION});
                return;
            }
            if (!score) {
                // retorna error si el score no se encuentra
                res.status(422).send({error: ERRORS.INVALID_SCORE});
                return;
            }
            if (!date) {
                // retorna error si la fecha no se encuentra
                res.status(422).send({error: ERRORS.INVALID_DATE});
                return;
            }
    
            let formated_name = name.toLowerCase();
            let event = await Event.findOne({name: formated_name}).exec();
            if (event && event._id != id) {
                // ya existe un evento con ese nombre
                res.status(422).send({error: ERRORS.NAME_ALREADY_TAKEN});
                return;
            }

            let date_formated = new Date(date.year, date.month, date.day);

            let updated_event = await Event.findOne({_id: id});

            // Se actualiza la información
            updated_event.name = name;
            updated_event.description = description;
            updated_event.score = score;
            updated_event.date = date_formated;

            let updated = await updated_event.save();

            res.status(200).send(updated);
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    },
    /**
     * Obtiene un evento
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async get(req, res) {
        try {
            let id = req.params.id;

            let event = await Event.findById({_id: id});

            res.status(200).send(event);
        } catch (err) {
            res.status(200).send(err.message);
        }
    },
}

module.exports = event_controller;