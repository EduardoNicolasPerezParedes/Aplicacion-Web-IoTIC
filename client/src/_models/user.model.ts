export class User {
    constructor(
        private name: string,
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

    public parseToJSON() {
        return JSON.parse(JSON.stringify(this));
    }
}