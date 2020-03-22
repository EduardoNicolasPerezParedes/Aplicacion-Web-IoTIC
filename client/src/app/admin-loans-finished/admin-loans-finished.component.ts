import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/_models/loan.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { LoanService } from 'src/_services/loan.service';
import { faPlus, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoanInfoComponent } from './loan-info/loan-info.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
   * Prestamos registrados
   */
  public loans: Array<Loan>;

  /**
   * ¿Está cargando la petición?
   */
  public isLoading: boolean;
  /**
   * Contador para el número de prestamos
   */
  public contador: number;

  constructor(private loanService: LoanService,private modalService: NgbModal) {
      
   }

  ngOnInit() {
    this.getLoan();
  }


    /**
   * Cargar los prestamos
   */
  private async getLoan() { 
    try {
      this.isLoading = true;
      let res: any = await this.loanService.list().toPromise();
      this.loans = new Array<Loan>();
      res.forEach((e: Object) => {
        if(Loan.fromJSON(e).state == 2){
          this.loans.push(Loan.fromJSON(e));
        }
        
      }); 
      this.isLoading = false;
    } catch (err) {
      new MsgHelper().showError(err.error);
      this.isLoading = false;
    }
  }

    /**
   * Mostrar información del prestamo
   */
  public showOnClick(id: string) {
    LoanInfoComponent.idLoan = id;
    this.modalService.open(LoanInfoComponent);
  }


}