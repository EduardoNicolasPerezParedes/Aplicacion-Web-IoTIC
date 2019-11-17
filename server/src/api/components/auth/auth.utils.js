const jwt = require('jsonwebtoken');
const auth = require('./../../../config/auth');

/**
 * Genera y retorna un token para la sesión de un usuario.
 * 
 * @param {object} user_data usuario que va a iniciar sesión.
 */
const generateToken = async (user_data) => {
    return jwt.sign(user_data, auth.secret);
}

module.exports = generateToken;