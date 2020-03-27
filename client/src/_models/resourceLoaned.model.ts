import { User } from './user.model';
import { Resource } from './resource.model';
import { Loan } from './loan.model';

export class ResourceLoaned{
    /**
     * Id del prestamo
     */
    public loan: Loan;

    /**
     * Id del usuario
     */
    public resource: Resource;



    constructor() {
        this.loan = new Loan();
        this.resource = new Resource();
    }

    public static fromJSON(json: any): ResourceLoaned {
        let r = new ResourceLoaned();

        r.loan.user.id = json.userId;
        r.loan.loanId  = json.loanId;
        r.resource.id = json.resourceId;
        r.resource.quantity = json.quantity;


        return r;
    }
    
}