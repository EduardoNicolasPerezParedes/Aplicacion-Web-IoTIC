import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Loan } from 'src/_models/loan.model';
import { LoanService } from 'src/_services/loan.service';
import { Resource } from 'src/_models/resource.model';
import { ResourceLoaned } from 'src/_models/resourceLoaned.model';
import { ResourceLoanedService } from 'src/_services/resourceLoaned.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { ResourceService } from 'src/_services/resource.service';
import { UserService } from 'src/_services/user.service';
import { User } from 'src/_models/user.model';
import { DateHelper } from 'src/_helpers/date.helper';

/**
* Estructura de la información de los recursos a mostrar
*/
interface infoTable  {
  resourceName : string ,
  quantity : number
};

@Component({
  selector: 'app-loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.css']
})
export class LoanInfoComponent implements OnInit {

  /**
  * Información del prestamo
  */
  public static loan : Loan;
  public auxLoan : Loan;
  /**
  * Información de los recursos a mostrar
  */
  public infoResource : Array<infoTable>;
  public resources : Array<Resource>;

  constructor(public modalContent: NgbActiveModal, 
    private serviceResourcesLoaned : ResourceLoanedService,
    private serviceResource : ResourceService,
    private dateHelper : DateHelper) {
    
    this.infoResource = new Array<infoTable>();
    this.auxLoan = new Loan();
  
   }

  ngOnInit() {
    this.setResourceLoaned();
  }
   /**
   * Invocada al dar click en Cancelar
   */
  public cancelOnClick() {
    this.close();
  }
  /**
   * Cierra el formulario
   */
  private close() {
    this.modalContent.close();
  }
  /**
   * Obtiene los id de los recursos pertenecientes al prestamo
   */
  private async setResourceLoaned(){
    this.auxLoan = LoanInfoComponent.loan;
    let res: any = await this.serviceResourcesLoaned.get_by_loanId(this.auxLoan.loanId).toPromise();
    res.forEach((e: Object) => {
      this.getInfo(ResourceLoaned.fromJSON(e).resource.id,ResourceLoaned.fromJSON(e).resource.quantity);
    });  

  }
  /**
   * Obtiene los nombres de los recursos
   */
  private async getInfo( id :string,quantity:number){
    let rec: any =await  this.serviceResource.get(id).toPromise();
    let info : infoTable
   = {
      resourceName : Resource.fromJSON(rec).name,
      quantity : quantity
    };
    this.infoResource.push(info);
  }

}
