export class Message {
    constructor(
        public id: string,
        public sender: string,
        public email: string,
        public phone_number: string,
        public message: string,
        public send_at: Date
    ) { }

    public getSendAt(): string {
        var send_at_str = '';

        let year = this.send_at.getFullYear().toString();
        let month = this.send_at.getMonth().toString();
        let day = this.send_at.getDate().toString();
        send_at_str = `${day}/${month}/${year}`;

        return send_at_str;
    }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): Message{
        if (json === null) { return null; }
        return new Message(
            json._id,
            json.sender,
            json.email,
            json.phone_number,
            json.message,
            new Date(json.send_at)
        )
    }
}