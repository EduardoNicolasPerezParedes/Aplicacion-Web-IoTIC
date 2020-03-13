import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
 
@Injectable()
export class FileService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'file';
    }

    /**
     * Sube un nuevo archivo.
     * 
     * @param file Archivo a ser subido.
     * @param model Modelo al que pertenece el archivo
     * @param id Identificador del registro
     */
    upload(file, model, id) {
        // TODO: Llamar al método POST pasando los parámetros
    }

}