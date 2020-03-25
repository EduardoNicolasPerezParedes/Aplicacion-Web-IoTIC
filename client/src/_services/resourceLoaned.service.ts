import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { ResourceLoaned } from 'src/_models/resourceLoaned.model';

@Injectable()
export class ResourceLoanedService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'resourceLoaned';
    }

    /**
     * Registra un nuevo recurso
     * 
     * @param resource Recurso a ser registrado
     
    create(resource: Resource) {
        return this.http.post(
            this.apiUrl,
            resource.parseToJSON(),
            { headers: this.headers }
        )
    }
*/
    /**
     * Lista los recursos registrados
     */
    list() {
        return this.http.get(
            this.apiUrl,
            { headers: this.headers }
        )
    }

    /**
     * Obtiene la información de un recurso
     * @param id Identificador del Recurso
     */
    get(id: string) {
        return this.http.get(
            `${this.apiUrl}/${id}`,
            { headers: this.headers }
        )
    }

    /**
     * Obtiene los recursos pertenecientes a una categoría.
     * @param loanId Identificador de la categoría
     */
    get_by_loanId(loanId: string) {
        return this.http.get(
            `${this.apiUrl}/loan/${loanId}`,
            { headers: this.headers }
        );
    }
}