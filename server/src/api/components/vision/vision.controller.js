const ERRORS = require('./vision.errors');
const Vision = require('./vision.model');

const vision_controller = {
    /**
     * Registra la visión del semillero
     * 
     * @param {object} req petición del cliente.
     * @param {object} res respuesta del servidor.
     */
    async createVision(req, res) {
        try {
            let vision = req.body.vision;

            if(!vision) {
                // retorna error si la visión del semillero no se encuentra
                res.status(422).send({error: ERRORS.INVALID_VISION});
                return;
            }

            let new_vision = await Vision.create({
                vision: vision
            });

            res.status(200).send(new_vision);
        } catch(err) {
            res.status(500).send({error: err.message});
        }
    },

    /**
     * Actualiza la visión del semillero
     * 
     * @param {object} req petición del cliente.
     * @param {object} res respuesta del servidor.
     */
    async updateVision(req, res) {
        try {
            let id = req.params.id;
            let vision = req.body.vision;

            if(!vision) {
                // retorna error si la visión del semillero no se encuentra
                res.status(422).send({error: ERRORS.INVALID_VISION});
                return;
            }

            let updated_vision = await Vision.findOne({_id: id});

            // Se actualiza la información
            updated_vision.vision = vision;

            let updated = await updated_vision.save();

            res.status(200).send(updated);
        } catch(err) {
            res.status(500).send({error: err.message});
        }
    },

    /**
     * Obtiene la visión del semillero
     * 
     * @param {object} req petición del cliente
     * @param {object} res respuesta del servidor
     */
    async listVision(req, res) {
        let vision = await Vision.find({});
        return res.status(200).json(vision);
    }
}

module.exports = vision_controller;