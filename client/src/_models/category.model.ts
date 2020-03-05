export class Category {
    /**
     * Identificador de la Categoría
     */
    public id: string;

    /**
     * Nombre de la categoría
     */
    public name: string;

    /**
     * Estado de la categoría
     */
    public state: boolean;

    /**
     * Referencia
     */
    public parent: Category;

    constructor() {}

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(): Category {
        return null;
    }
}