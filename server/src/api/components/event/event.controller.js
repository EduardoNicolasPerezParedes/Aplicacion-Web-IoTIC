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
    }
}

module.exports = event_controller;