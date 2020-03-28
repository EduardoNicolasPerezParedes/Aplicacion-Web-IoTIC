const ERRORS = require('./mission.errors');
const Mission = require('./mission.model');

const mission_controller = {
    /**
     * Registra la misión del semillero
     * 
     * @param {object} req petición del cliente.
     * @param {object} res respuesta del servidor.
     */
    async createMission(req, res) {
        try {
            let mission = req.body.mission;

            if(!mission) {
                // retorna error si la misión del semillero no se encuentra
                res.status(422).send({error: ERRORS.INVALID_MISSION});
                return;
            }

            let new_mission = await Mission.create({
                mission: mission
            });

            res.status(200).send(new_mission);
        } catch(err) {
            res.status(500).send({error: err.message});
        }
    },

    /**
     * Actualiza la misión del semillero
     * 
     * @param {object} req petición del cliente.
     * @param {object} res respuesta del servidor.
     */
    async updateMission(req, res) {
        try {
            let id = req.params.id;
            let mission = req.body.mission;

            if(!mission) {
                // retorna error si la misión del semillero no se encuentra
                res.status(422).send({error: ERRORS.INVALID_MISSION});
                return;
            }

            let updated_mission = await Mission.findOne({_id: id});

            // Se actualiza la información
            updated_mission.mission = mission;

            let updated = await updated_mission.save();

            res.status(200).send(updated);
        } catch(err) {
            res.status(500).send({error: err.message});
        }
    },

    /**
     * Obtiene la misión del semillero
     * 
     * @param {object} req petición del cliente
     * @param {object} res respuesta del servidor
     */
    async listMission(req, res) {
        let mission = await Mission.find({});
        return res.status(200).json(mission);
    }
}

module.exports = mission_controller;