const Message = require('./message.model');
const ERRORS = require('./message.errors');

const message_controller = {
    /**
     * Registra un nuevo mensaje, si y sólo si, todos los
     * atributos requeridos se encuentran dentro de la petición.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async create(req, res) {
        let sender = req.body.sender;
        let email = req.body.email;
        let phone_number = req.body.phone_number;
        let message = req.body.message;

        if (!sender) {
            // retorna error si el remitente no se encuentra
            res.status(422).send({error: ERRORS.INVALID_SENDER});
            return;
        }
        if (!email) {
            // retorna error si el email del remitente no se encuentra
            res.status(422).send({error: ERRORS.INVALID_EMAIL});
            return;
        }
        if (!phone_number) {
            // retorna error si el teléfono del remitente no se encuentra
            res.status(422).send({error: ERRORS.INVALID_PHONE_NUMBER});
            return;
        }
        if (!message) {
            // retorna error si el mensaje no se encuentra
            res.status(422).send({error: ERRORS.INVALID_MESSAGE});
            return;
        }

        try {
            let new_message = await Message.create({
                sender: sender,
                email: email,
                phone_number: phone_number,
                message: message
            });    
            return res.status(200).send(new_message);
        } catch(err) {
            return res.status(500).send({error: err});
        }
    },

    /**
     * Retorna todos los mensajes.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async list(req, res) {
        let msgs = await Message.find({});
        return res.status(200).json(msgs);
    },

    /**
     * Elimina un mensaje.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async delete(req, res) {
        let id = req.params.id;

        try {
            await Message.deleteOne({_id: id});
            return res.sendStatus(200);
        } catch(err) {
            return res.status(500).json({error: err});
        }
    }
}

module.exports = message_controller;