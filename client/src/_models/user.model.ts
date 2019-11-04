export class User {
    constructor(
        public name: string,
        private email: string,
        private career: string,
        private birth_date: string,
        private student: boolean,
        private semester: number
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
            json.semester
        )
    }
}