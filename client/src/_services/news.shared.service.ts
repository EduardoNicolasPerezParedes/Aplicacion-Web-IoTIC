import { Injectable, Output, EventEmitter } from '@angular/core';
import { News } from 'src/_models/news.model';

@Injectable()
export class NewsSharedService {
    /**
     * Permite referenciar a las noticias
     */
    @Output() newsEmitter: EventEmitter<any> = new EventEmitter();

    /**
     * Noticias registrados
     */
    private _news: Array<News>;

    constructor() { }
 
    set news(value: Array<News>) { this._news = value; }
    get news() { return this._news; }

    /**
     * Agrega una noticia
     * @param news Noticia a agregar
     */
    public add(news: News) {
        this._news.push(news);
    }

    /**
     * Retorna la referencia a las noticias
     */
    public refNews() {
        return this.newsEmitter;
    }
}