import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
 
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
}