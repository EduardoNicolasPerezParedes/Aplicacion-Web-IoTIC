export class News {
    /**
     * Identificador de la noticia
     */
    public id: string;

    /**
     * Titulo de la noticia
     */
    public title: string;

    /**
     * Descripción de la noticia
     */
    public description: string;

    /**
     * Desarrollo de la notcia.
     */
    public development: string;

    /**
     * Fecha
     */
    public date: Date;

    constructor() { }

    public getDate(): string {
        var date_str = '';

        let year = this.date.getFullYear().toString();
        let month = this.date.getMonth().toString();
        let day = this.date.getDate().toString();
        date_str = `${day}/${month}/${year}`;

        return date_str;
    }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): News {
        if (json === null) { return null; }
        var news = new News();

        news.id = json._id;
        news.title = json.title;
        news.description = json.description;
        news.development = json.development;
        news.date = new Date(json.starts_at);

        return news;
    }

    public getDescPreview(): string {
        return this.description.slice(0, 30);
    }
}