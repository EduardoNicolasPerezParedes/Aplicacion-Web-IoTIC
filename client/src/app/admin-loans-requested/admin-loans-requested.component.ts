import { Component, OnInit } from '@angular/core';

import { Loan } from 'src/_models/loan.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { LoanService } from 'src/_services/loan.service';
import {  faEye  } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoansFormComponent } from './loans-form/loans-form.component';
import { DateHelper } from 'src/_helpers/date.helper';
import { ResourceLoanedService } from 'src/_services/resourceLoaned.service';
import { UserService } from 'src/_services/user.service';
import { ResourceLoaned } from 'src/_models/resourceLoaned.model';
import { User } from 'src/_models/user.model';

@Component({
  selector: 'app-admin-loans-requested',
  templateUrl: './admin-loans-requested.component.html',
  styleUrls: ['./admin-loans-requested.component.css']
})
export class AdminLoansRequestedComponent implements OnInit {
  public faEye = faEye;


  /**
   * Prestamos registrados
   */
  private loans: Array<Loan>;

  /**
   * Hay prestamos?
   */
  public weHaveLoan: boolean;
  /**
   * Prestamos registrados con usuarios
   */
  public loansShow : Array<Loan>;

  constructor(private loanService: LoanService,private modalService: NgbModal,
    private dateHelper : DateHelper,
    private serviceResourcesLoaned : ResourceLoanedService,
    private serviceUser : UserService
    ) { 
      this.loansShow = new Array<Loan>();
    }

  ngOnInit() {
    this.getLoan();
  }
  /**
   * Cargar los prestamos
   */
  private async getLoan() { 
    try {
      this.weHaveLoan = true;
      let res: any = await this.loanService.list().toPromise();
      this.loans = new Array<Loan>();
      res.forEach((e: Object) => {
        if(Loan.fromJSON(e).state == 0){
          this.loans.push(Loan.fromJSON(e));
        }
      });
    } catch (err) {
      new MsgHelper().showError(err.error);
      this.weHaveLoan = false;
    }
    this.weHaveLoan = this.loans.length > 0;
    this.getUsers();
  }
  /**
   * Obtener los usuarios
   */
  public async getUsers(){
    this.loans.forEach(element => {
      this.getResourceLoaned(element);
    });
  }
  /**
   * Obtener id del usuario
   */
  public async getResourceLoaned(varLoan:Loan){
    let idUser : string;
    let res: any = await this.serviceResourcesLoaned.get_by_loanId(varLoan.loanId).toPromise(); 
    res.forEach((e: Object) => {
      idUser = ResourceLoaned.fromJSON(e).userId;
    });  
    this.setUser(idUser,varLoan);
  }
  /**
   * Agregar usuario al prestamo
   */
  private async setUser(id : string,varLoan:Loan){
    try {
      let res = await this.serviceUser.get(id).toPromise();
      let user = User.fromJSON(res);
      
      varLoan.user = user;
      this.loansShow.push(varLoan);

    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }
  /**
   * Mostrar info
   */
  public showOnClick(l : Loan) {
    LoansFormComponent.loan = l;
    this.modalService.open(LoansFormComponent);
  }
  /**
   * Invocada al dar click en Eliminar
   * @param id Identificador del curso
   */
  public async deleteOnClick(id: string) {
    let msg = new MsgHelper();
    let res = await msg.showConfirmDialog('¿Está seguro?', 'La solicitud será eliminada de forma permanente');
    /** 
    if (res.value) {
      try {
        await this.courseService.delete(id).toPromise();
      } catch(err) {
        if (err.status == 200) {
          msg.showSuccess('El curso fue eliminado exitosamente');
          this.setCourses();
          return;
        }
        msg.showError('El curso no pudo ser eliminado');
      }
    }*/
  }

}
