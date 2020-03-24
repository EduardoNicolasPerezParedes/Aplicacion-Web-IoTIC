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
}

module.exports = loan_controller;