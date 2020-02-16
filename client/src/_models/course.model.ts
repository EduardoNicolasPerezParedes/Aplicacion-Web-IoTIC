export class Course {
    /**
     * Identificador del curso
     */
    public id: string;

    /**
     * Nombre del curso
     */
    public name: string;

    /**
     * Descripción
     */
    public description: string;

    /**
     * Profesor que imparte el curso
     */
    public teacher: string;

    /**
     * Fecha de inicio
     */
    public starts_at: Date;

    /**
     * Fecha fin
     */
    public ends_at: Date;

    constructor() { }

    public getStartsAt(): string {
        var starts_at_str = '';

        let year = this.starts_at.getFullYear().toString();
        let month = this.starts_at.getMonth().toString();
        let day = this.starts_at.getDate().toString();
        starts_at_str = `${day}/${month}/${year}`;

        return starts_at_str;
    }

    public getEndsAt(): string {
        var ends_at_str = '';

        let year = this.ends_at.getFullYear().toString();
        let month = this.ends_at.getMonth().toString();
        let day = this.ends_at.getDate().toString();
        ends_at_str = `${day}/${month}/${year}`;

        return ends_at_str;
    }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): Course {
        if (json === null) { return null; }
        var course = new Course();

        course.id = json._id;
        course.name = json.name;
        course.description = json.description;
        course.teacher = json.teacher;
        course.starts_at = new Date(json.starts_at);
        course.ends_at = new Date(json.ends_at);

        return course;
    }
}