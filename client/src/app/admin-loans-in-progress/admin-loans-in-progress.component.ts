import { Component, OnInit } from '@angular/core';
import { faEye, faTrashAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Loan } from 'src/_models/loan.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { LoanService } from 'src/_services/loan.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanInfoComponent } from '../admin-loans-finished/loan-info/loan-info.component';

@Component({
  selector: 'app-admin-loans-in-progress',
  templateUrl: './admin-loans-in-progress.component.html',
  styleUrls: ['./admin-loans-in-progress.component.css']
})
export class AdminLoansInProgressComponent implements OnInit {

  /**
  * Icono de ver información
  */
  public faEye = faEye;

  /**
  * Icono de Finalizar prestamos
  */
  public faPaperPlane = faPaperPlane;

  /**
  * Icono de Usuario
  */
  public faTrashAlt = faTrashAlt;

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

  /**
  * Cargar los datos
  */
  private async getLoan() { 
    try {
      this.isLoading = true;
      let res: any = await this.loanService.list().toPromise();
      this.loans = new Array<Loan>();
      res.forEach((e: Object) => {
        if(Loan.fromJSON(e).state == 1){
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
   * Invocada al dar click en Eliminar
   * @param id Identificador del curso
   */
  public async sendMessage(id: string) {
    let msg = new MsgHelper();
    let res = await msg.showConfirmMessage('¿Desea enviar correo de solicitud de recursos?','');
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

    /**
   * Invocada al dar click en Finalizar prestamos
   * @param id Identificador del curso
   */
  public async loanfinished(id: string) {
    let msg = new MsgHelper();
    let res = await msg.showConfirmDialog('¿Está seguro?', 'Finalizar prestamo');
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

    /**
   * Mostrar info
   */
  public showOnClick(id: number) {
    
    this.modalService.open(LoanInfoComponent);
  }

}
