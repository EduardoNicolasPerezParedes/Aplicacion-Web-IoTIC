const jwt = require('jsonwebtoken');
const auth = require('./../../../config/auth');

/**
 * Genera y retorna un token para la sesión de un usuario.
 * 
 * @param {object} user usuario que va a iniciar sesión.
 */
const generateToken = async (user) => {
    return jwt.sign(user, auth.secret);
}

module.exports = generateToken;