const ERRORS = require('./auth.errors');
const generateToken = require('./auth.utils');
const User = require('../user/user.model');

const auth_controller = {
    /**
     * Inicia una nueva sesión. 
     * 
     * @param {object} req - petición del cliente
     * @param {oobject} res - respuesta del servidor
     */
    async login(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        if (!email) {
            // retorna error si el e-mail no se encuentra
            res.status(422).send({error: ERRORS.INVALID_EMAIL});
            return;
        }
        if (!password) {
            // retorna error si el e-mail no se encuentra
            res.status(422).send({error: ERRORS.INVALID_PASSWORD});
            return;
        }
        
        let user = await User.findOne({email: email});

        if (!user) {
            // el usuario no se encuentra registrado 
            res.status(401).send({error: ERRORS.UNAUTHORIZED});
            return;
        } else {
            if (!user.admitted) {
                // el usuario todavía no ha sido admitido
                res.status(401).send({error: ERRORS.NOT_ADMITTED});
                return;    
            }
            if (user.comparePassword(password)) {
                token = await generateToken({user});
                res.status(200).json({
                    token: `${token}`
                });
            } else {
                // la contraseña es incorrecta
                res.status(401).send({error: ERRORS.WRONG_PASWORD});
                return;  
            }
        }
    }
}

module.exports = auth_controller;