export class User {
    constructor(
        public name: string,
        public email: string,
        public career: string,
        public birth_date: string,
        public student: boolean,
        public semester: number,
        public admin: boolean
    ) { 
        if (this.student === false) {
            this.semester = null;
        }
    }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): User {
        if (json === null) { return null; }
        return new User(
            json.name,
            json.email,
            json.career,
            json.birth_date,
            json.student,
            json.semester,
            json.admin
        )
    }
}