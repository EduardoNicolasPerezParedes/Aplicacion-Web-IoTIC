import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from './http.service';
import { Category } from 'src/_models/category.model';
 
@Injectable()
export class CategoryService extends HttpService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += 'category';
    }

    /**
     * Registra una nueva categoría.
     * 
     * @param category categoría a ser registrada.
     */
    create(category: Category) {
        return this.http.post(
            this.apiUrl, 
            category.parseToJSON(),
            { headers: this.headers }
        );
    }

    /**
     * Lista las categorías registradas.
     */
    list() {
        return this.http.get(
            this.apiUrl,
            { headers: this.headers }
        );
    }
}