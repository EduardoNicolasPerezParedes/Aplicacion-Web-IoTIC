export class Course {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public teacher: string,
        public starts_at: Date,
        public ends_at: Date
    ) { }

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

    public static fromJSON(json): Course{
        if (json === null) { return null; }
        return new Course(
            json._id,
            json.name,
            json.description,
            json.teacher,
            new Date(json.starts_at),
            new Date(json.ends_at)
        )
    }
}