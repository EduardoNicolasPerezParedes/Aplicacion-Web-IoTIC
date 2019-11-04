import { User } from '../_models/user.model';

export class AuthHelper {
    /**
     * Obtiene el usuario de la sesión actual. 
     */
    public static getLoggedUser(): User {
        let user_str = localStorage.getItem('user');
        return User.fromJSON(JSON.parse(user_str));
    }

    /**
     * Setea el usuario de la sesión actual.
     * 
     * @param res respuesta del servidor al iniciar sesión. Contiene el token y el usuario.
     */
    public static setLoggedUser(res): void {
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', JSON.stringify(res.token));
    }   
}