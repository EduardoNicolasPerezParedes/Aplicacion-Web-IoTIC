import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Loan } from 'src/_models/loan.model';

 
@Injectable()
export class LoanService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'loan';
    }

    /**
     * Obtiene los prestamos registrados.
     * 
     */
    list() {
        return this.http.get(
            this.apiUrl,
            { headers: this.headers }
        )
    }
    /**
     * Obtiene un prestamo.
     * 
     * @param id identificador del prestamo.
     */
    get(id: string) {
        return this.http.get(
            `${this.apiUrl}/${id}`,
            { 
                headers: this.headers
            },
        );
    }
    /**
     * Actualiza un Prestamo.
     * 
     * @param id identificador del prestamo.
     * @param loan Contiene la información actualizada del prestamo
     */
    update(id: string, loanAux: Loan) {
        return this.http.put(
            `${this.apiUrl}/${id}`,
            loanAux.parseToJSON(),
            { headers: this.headers }
        )
    }
    /**
     * Actualiza un Prestamo.
     * 
     * @param id identificador del prestamo.
     * @param loan Contiene la información actualizada del prestamo
     */
    updateState(id: string, loanAux: Loan) {
        return this.http.put(
            `${this.apiUrl}/finished/${id}`,
            loanAux.parseToJSON(),
            { headers: this.headers }
        )
    }
    /**
     * Elimina un prestamo.
     * 
     * @param id identificador del prestamo.
     */
    delete(id: string) {
        return this.http.delete(
            `${this.apiUrl}/${id}`,
            { 
                headers: this.headers
            },
        );
    }
    

}