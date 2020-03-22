import { Component, OnInit } from '@angular/core';

import { Loan } from 'src/_models/loan.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { LoanService } from 'src/_services/loan.service';
import {  faEye  } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoansFormComponent } from './loans-form/loans-form.component';

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
  public loans: Array<Loan>;

  /**
   * ¿Está cargando la petición?
   */
  public isLoading: boolean;

  constructor(private loanService: LoanService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getLoan();
  }



  private async getLoan() { 
    try {
      this.isLoading = true;
      let res: any = await this.loanService.list().toPromise();
      this.loans = new Array<Loan>();
      res.forEach((e: Object) => {
        if(Loan.fromJSON(e).state == 0){
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
  * Mostrar formulario de aprobar prestamo
  */
  public showOnClick(id: number) {
    
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
