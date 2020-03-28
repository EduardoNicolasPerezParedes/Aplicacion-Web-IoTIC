import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/_services/loan.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanFormComponent } from './loan-form/loan-form.component';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  /**
   * Icono de Agregar Prestamo
   */
  private faPlus = faPlus;

  constructor(
    private loanService: LoanService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  /**
   * Obtiene y setea la información de los prestamos del usuario
   */
  private async setLoans() {
    try {

    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }

  /**
   * Invocada al dar click en Agregar Prestamo
   */
  private addOnClick() {
    this.modalService.open(LoanFormComponent)
  }
}
