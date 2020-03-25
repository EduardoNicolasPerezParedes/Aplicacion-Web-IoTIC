const ERRORS = require('./user.errors');
const User = require('./user.model');

const user_controller = {
    /**
     * Registra un nuevo usuario a la base de datos, si y sólo si, todos los 
     * atributos requeridos se encuentran dentro de la petición.
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async create(req, res) {
        // busca atributos que no se encuentren dentro de la petición
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let birth_date = req.body.birth_date;
        let career = req.body.career;
        let student = req.body.student;
        let semester = req.body.semester;

        console.log(req.body);

        if (!name) {
            // retorna error si el nombre no se encuentra
            res.status(422).send({error: ERRORS.INVALID_NAME});
            return;
        }
        if (!email) {
            // retorna error si el e-mail no se encuentra
            res.status(422).send({error: ERRORS.INVALID_EMAIL});
            return;
        }
        if (!phone) {
            // retorna error si el telefono no se encuentra
            res.status(422).send({error: ERRORS.INVALID_PHONE});
            return;
        }
        if (!birth_date) {
            // retorna error si la fecha de nacimiento no se encuentra
            res.status(422).send({error: ERRORS.INVALID_BIRTHDATE});
            return;
        }
        if (!career) {
            // retorna error si la carrera no se encuentra
            res.status(422).send({error: ERRORS.INVALID_CAREER});
            return;
        }
        if (student === undefined) {
            // retorna error si el campo estudiante no se encuentra
            res.status(422).send({error: ERRORS.INVALID_STUDENT});
            return;
        }
        if (!student) {
            semester = null;
        } else if (!semester){
            // retorna error si el semestre no se encuentra
            res.status(422).send({error: ERRORS.INVALID_SEMESTER});
            return;
        }

        try {
            let formated_email = email.toLowerCase();
            let user = await User.findOne({email: formated_email}).exec();

            if (user) {
                // el e-mail ya se encuentra registrado
                res.status(422).send({error: ERRORS.ALREADY_REGISTERED});
                return;
            } 

            if (student === false) {
                semester = null;
            }

            // registra al nuevo usuario
            let new_user = new User({
                name: name,
                email: email,
                phone: phone,
                birth_date: birth_date,
                career: career,
                semester: semester,
                student: student
            });
            let user_saved = await new_user.save();

            // envía la información del usuario registrado
            res.status(200).send(user_saved);
        } catch (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        }
    },

    /**
     * Obtiene todos los usuarios cuyas solicitudes aún no han sido aprobadas.
     * 
     * @param {object} req - petición del cliente
     * @param {object} res - respuesta del servidor
     */
    async listPending(req, res) {
        try {
            let users = await User.find({ admitted:"false" });
            res.status(200).send(users);
        } catch (err) {
            res.status(200).send(err.message);
        }
    },

    /**
     * Obtiene todos los usuarios cuyas solicitudes aún no han sido aprobadas.
     * 
     * @param {object} req - petición del cliente
     * @param {object} res - respuesta del servidor
     */
    async listMembers(req, res) {
        try {
            let users = await User.find({ admitted:"true" });
            res.status(200).send(users);
        } catch (err) {
            res.status(200).send(err.message);
        }
    },

    /**
     * Elimina una solicitud de registro
     * 
     * @param {object} req - petición del cliente
     * @param {object} res - respuesta del servidor 
     */
    async deletePending(req, res) {
        try {
            let id = req.params.id;

            await Event.findByIdAndRemove({_id: id});

            res.sendStatus(200);
        } catch(err) {
            res.status(200).send(err.message);
        }
    },
}

module.exports = user_controller;