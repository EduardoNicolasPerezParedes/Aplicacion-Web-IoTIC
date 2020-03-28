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
   * Prestamos registrados sin  usuarios
   */
  private loans: Array<Loan>;
  /* Hay prestamos?
   */
  public weHaveLoan: boolean;

  constructor(private loanService: LoanService,private modalService: NgbModal,
    private dateHelper : DateHelper
    ) {
      this.loans = new Array<Loan>();
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
    
  }
  

}