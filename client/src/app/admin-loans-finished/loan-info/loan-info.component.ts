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
  public resources : Array<ResourceLoaned>;

  constructor(public modalContent: NgbActiveModal, 
    private serviceResourcesLoaned : ResourceLoanedService,
    private serviceResource : ResourceService,
    private dateHelper : DateHelper) {
    
    this.resources = new Array<ResourceLoaned>();
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
   * Obtiene los recursos prestados
   * 
   */
  private async setResourceLoaned(){
    this.auxLoan = LoanInfoComponent.loan;
    let res: any = await this.serviceResourcesLoaned.get_by_loanId(this.auxLoan.loanId).toPromise();
    res.forEach((e: Object) => {
      this.resources.push(ResourceLoaned.fromJSON(e));
    });  

  }


}
