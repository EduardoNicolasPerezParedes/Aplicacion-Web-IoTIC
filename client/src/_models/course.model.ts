export class Course {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public teacher: string,
        public starts_at: string,
        public ends_at: string
    ) { }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }
}