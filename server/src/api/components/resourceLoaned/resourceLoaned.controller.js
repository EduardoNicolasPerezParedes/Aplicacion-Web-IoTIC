const resourceLoaned = require('./resourceLoaned.model');
const ERRORS = require('./resourceLoaned.erros');

const resourceLoaned_controller = {
    /**
     * Agrega nuevos id asociados a un prestamo. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
   async create(req, res) {
        try {
            let loadIdAux = req.body.loanId;
            let userIdAux = req.body.userId;
            let resourceIdAux = req.body.resourceId;
            let quantityAux = req.body.quantity;


            let created = await resourceLoaned.create({
                loanId: loadIdAux,
                userId: userIdAux,
                resourceId: resourceIdAux,
                quantity : quantityAux
            });
            res.status(200).send(created);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
     * Lista todos los id asociados a un prestamo registrados. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async list(req, res) {
        try {
            let rl = await resourceLoaned.find({});

            res.status(200).send(rl);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
     * Obtiene los id de los recursos asociados al prestamo
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async get(req, res) {
        try {
            let id = req.params.id;
            let rl = await resourceLoaned.findOne({_id: id});

            res.status(200).send(rl);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
     * Obtiene los id de los recursos asociados al prestamo. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async get_by_loanId(req, res) {
        try {
            let loan_id = req.params.loan_id;
            let rl = await resourceLoaned.find({loanId: loan_id});

            res.status(200).send(rl);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    /**
    * Elimina un resourceLoaned.
    * @param {object} req - petición del cliente
    * @param {oobject} res - respuesta del servidor
    */
    async delete(req, res) {
        try {
            let loan_id = req.params.loanId;

            await resourceLoaned.remove({loanId : loan_id});
            
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }
}

module.exports = resourceLoaned_controller;