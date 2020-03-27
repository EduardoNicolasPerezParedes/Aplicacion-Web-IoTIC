import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/_models/loan.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { LoanService } from 'src/_services/loan.service';
import { faPlus, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoanInfoComponent } from './loan-info/loan-info.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/_models/user.model';
import { UserService } from 'src/_services/user.service';
import { ResourceLoanedService } from 'src/_services/resourceLoaned.service';
import { ResourceLoaned } from 'src/_models/resourceLoaned.model';
import { DateHelper } from 'src/_helpers/date.helper';

@Component({
  selector: 'app-admin-loans-finished',
  templateUrl: './admin-loans-finished.component.html',
  styleUrls: ['./admin-loans-finished.component.css']
})
export class AdminLoansFinishedComponent implements OnInit {
  
  /**
  * Icono de ver prestamo
  */
  public faEye = faEye;
  /**
   * Prestamos registrados con usuarios
   */
  public loansShow : Array<Loan>;
   /**
   * Prestamos registrados sin  usuarios
   */
  private loans: Array<Loan>;
  /* Hay prestamos?
   */
  public weHaveLoan: boolean;

  constructor(private loanService: LoanService,private modalService: NgbModal,
    private serviceUser : UserService,
    private serviceResourcesLoaned : ResourceLoanedService,
    private dateHelper : DateHelper
    ) {
      this.loans = new Array<Loan>();
      this.loansShow = new Array<Loan>();
   }

  ngOnInit() {
    this.getLoan();
    
  }
  /**
   * Mostrar información del prestamo
   */
  public showOnClick(l: Loan ){
    LoanInfoComponent.loan = l;
    this.modalService.open(LoanInfoComponent);
  }
  /**
   * Cargar los prestamos
   */
  private async getLoan() { 
    try {
      
      let res: any = await this.loanService.list().toPromise();
      res.forEach((e: Object) => {
        if(Loan.fromJSON(e).state == 2){
          this.loans.push(Loan.fromJSON(e));
        }
        
      }); 
      
    } catch (err) {
      new MsgHelper().showError(err.error);
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
      idUser = ResourceLoaned.fromJSON(e).loan.user.id;
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

}