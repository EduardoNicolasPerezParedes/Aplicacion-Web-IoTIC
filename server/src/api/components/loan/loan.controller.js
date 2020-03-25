const Loan = require('./loan.model');

const loan_controller = {
    /**
     * Obtiene todos los prestamos registrados.
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async list(req, res) {
        /*let loans = await Loan.find({});
        return res.status(200).json(loans);*/
        try {
            let loans = await Loan.find({});
            res.status(200).send(loans);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    /**
    * Retorna la información de un prestamo.
    * @param {object} req - petición del cliente
    * @param {oobject} res - respuesta del servidor
    */
    async get(req, res) {
        
        try {
            let id = req.params.id;

            let loan = await Loan.findById({_id: id});

            res.status(200).send(loan);
        } catch (err) {
            res.status(200).send(err.message);
        }
    }
}

module.exports = loan_controller;