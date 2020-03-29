const Loan = require('./loan.model');
const ERRORS = require('./loan.errors');
const ResourceLoaned = require('../resourceLoaned/resourceLoaned.model');

const loan_controller = {
    /**
     * Agrega un nuevo prestamo. 
     * 
     * @param {object} req - petición del cliente
     * @param {object} res - respuesta del servidor
     */
    async create(req, res) {
        
        try {
            let dateStartAux = new Date();
            let stateAux = 0;
            let resources = req.body.resources;
            let userIdAux = req.body.userId;

            for (let index = 0; index < resources.length; index++) {
                if(resources[index].quantity > resources[index].resource.quantity){
                    // retorna error si las unidades solicitadas son mayores que las existentes
                    res.status(422).send(ERRORS.INVALID_UNIT);
                    return;
                }
            }

            let created = await Loan.create({
                dateStart: dateStartAux,
                dateApproved: "",
                dateEnd: "",
                image_resource_link : "",
                image_format_link : "",
                userId : userIdAux,
                state : stateAux
            });
            
            for (let index = 0; index < resources.length; index++) {
                await ResourceLoaned.create({
                    loanId: created._id,
                    resourceId: resources[index].resource.id,
                    quantity : resources[index].quantity
                });    
            }

            
            res.status(200).send(created);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
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
            let loans = await Loan.find({}).populate('userId');
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

            let loan = await (await Loan.findById({_id: id})).populate('userId');

            res.status(200).send(loan);
        } catch (err) {
            res.status(200).send(err.message);
        }
    },
    /**
    * Aprueba un prestamo.
    * @param {object} req - petición del cliente
    * @param {oobject} res - respuesta del servidor
    */
    async update(req, res) {
        try {
            let id = req.params.id;
            let dateEndAux = req.body.dateEnd;
            let stateAux = req.body.state;

            if (!dateEndAux) {
                // retorna error en la fecha fin
                res.status(422).send({error: ERRORS.INVALID_DATE_END});
                return;
            }

            let updated_loan = await Loan.findOne({_id: id});

            auxDate = new Date(dateEndAux.year, dateEndAux.month, dateEndAux.day);

            if (updated_loan.dateStart > auxDate) {
                res.status(422).send({error: ERRORS.INVALID_DATE_END});
                return;
            }
            // Se actualiza la información
            updated_loan.dateApproved = new Date();
            updated_loan.dateEnd = new Date(dateEndAux.year, dateEndAux.month, dateEndAux.day);
            updated_loan.state = stateAux;

            let updated = await updated_loan.save();

            res.status(200).send(updated);
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    },
    /**
    * Actualiza el estado prestamo.
    * @param {object} req - petición del cliente
    * @param {oobject} res - respuesta del servidor
    */
    async updateState(req, res) {
        try {
            let id = req.params.id;
            let stateAux = req.body.state;
            
            let updated_loan = await Loan.findOne({_id: id});

            // Se actualiza la información
            updated_loan.dateEnd = new Date();
            updated_loan.state = stateAux;

            let updated = await updated_loan.save();

            res.status(200).send(updated);
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    },
    /**
     * Elimina un prestamo.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async delete(req, res) {
        try {
            let id = req.params.id;

            await Loan.findByIdAndRemove({_id: id});

            res.sendStatus(200);
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    },
    /**
     * Obtiene los prestamos de un usuario.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async getByUser(req, res) {
        try {
            let userId = req.params.userId;

            let loans = await Loan.find({userId: userId});

            res.status(200).send(loans);
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    }
}

module.exports = loan_controller;