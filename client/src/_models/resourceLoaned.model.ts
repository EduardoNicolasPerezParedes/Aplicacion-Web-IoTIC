import { User } from './user.model';
import { Resource } from './resource.model';
import { Loan } from './loan.model';

export class ResourceLoaned{
    /**
     * Id del prestamo
     */
    public loanId: string;

    /**
     * Id del usuario
     */
    public userId: string;

    /**
     * Id del recurso
     */
    public resourceId: string;

    /**
     * Cantidad de unidades
     */
    public quantity: number;

    /**
     * Fecha aprobado
     */
    public dateApproved: Date;

    constructor() {}

    
}