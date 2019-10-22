import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
import { User } from '../_models/user.model';
 
@Injectable()
export class AuthService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'auth';
    }

    /**
     * Inicia una nueva sesión.
     * 
     * @param email e-mail del usuario
     * @param password contraseña del usuario
     */
    login(email: string, password: string) {
        throw Error("Método 'login' no implementado");
    }

    /**
     * Cierra la sesión del usuario actual.
     * 
     * @param user usuario que desea cerrar la sesión
     */
    logout(user: User) {
        throw Error("Método 'logout' no implementado");
    }
}