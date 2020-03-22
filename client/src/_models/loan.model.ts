import { User } from './user.model';
import { Resource } from './resource.model';

export class Loan {
    public user: User;
    /**
     * Identificador del prestamo
     */
    public loanId: string; 

    /**
     * Fecha Inicio
     */
    public dateStart: Date;

    /**
     * Fecha fin
     */
    public dateEnd: Date;   
    /**
     * Fecha fin
     */
    public dateApproved: Date;

    /**
     * Fecha solicitud
     */
    public dateRequested: Date;
    /**
     * Detalles
     */
    public details: string;
        /**
     * Estado del prestamo 0:Solicitado 1:En curso 2:Finalizados
     */
    public state: number;

    constructor() {}

    public static fromJSON(json: any): Loan {
        if (json === null) { return null; }
        var loan = new Loan();

        loan.loanId = json._id;
        loan.dateStart = new Date(json.dateStart);
        loan.dateEnd = new Date(json.dateEnd);
        loan.details = json.details;
        loan.state = json.state;

        return loan;  
    }

    public parseToJSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }
}