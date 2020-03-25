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

@Component({
  selector: 'app-loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.css']
})
export class LoanInfoComponent implements OnInit {

  /**
  * Identificador del prestamo
  */
  public static idLoan:string;
  /**
  * Información del prestamo
  */
  public loan : Loan;
  /**
  * Información del prestamo
  */
 public resources : Array<Resource>;
   /**
  * Información del prestamo
  */
 public resourceLoaned : Array<ResourceLoaned>;

  constructor(public modalContent: NgbActiveModal, 
    private serviceLoan: LoanService,
    private serviceResourcesLoaned : ResourceLoanedService,
    private serviceUser : UserService ) {
    this.loan = new Loan();
    this.resources = new Array<Resource>();
    this.resourceLoaned = new Array<ResourceLoaned>();
   }

  ngOnInit() {
    this.setLoan(); 
    this.setResourceLoaned();
    //this.prueba();
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

  private async setLoan() {
    try {
      let res = await this.serviceLoan.get(LoanInfoComponent.idLoan).toPromise();
      this.loan = Loan.fromJSON(res);
    } catch (err) {
      this.close();
    }
  }

 /* private async setUser(){
    try {
      let res = await this.serviceUser.get().toPromise();
      this.loan = Loan.fromJSON(res);
    } catch (err) {
      this.close();
    }
  }*/

  private async setResourceLoaned(){
    console.log('LoanId: '+LoanInfoComponent.idLoan);
    let res: any = await this.serviceResourcesLoaned.get_by_loanId(LoanInfoComponent.idLoan).toPromise();
    console.log('res: '+ res);
    res.forEach((e: Object) => {
      console.log('e: '+ResourceLoaned.fromJSON(e).quantity);
        this.resourceLoaned.push(ResourceLoaned.fromJSON(e)); 
        console.log('HOLA');
    });     
  }


}
