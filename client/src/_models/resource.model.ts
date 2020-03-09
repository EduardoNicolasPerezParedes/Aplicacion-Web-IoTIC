import { Category } from './category.model';

export class Resource {
    /**
     * Identificador del Recurso
     */
    public id: string;

    /**
     * Nombre del Recurso
     */
    public name: string;

    /**
     * Descripción del Recurso
     */
    public description: string;

    /**
     * Link de la imagen del Recurso
     */
    public imageLink: string;

    /**
     * ¿Se encuentra disponible?
     */
    public available: boolean;

    /**
     * Cantidad de unidades
     */
    public quantity: number;

    /**
     * Categoría a la que pertenece
     */
    public category: Category;

    constructor() {}

    
}