import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.css']
})
export class LoanInfoComponent implements OnInit {

  /**
  * Identificador del prestamo
  */
  public static idLoan: string; 

  /**
  * Fecha Inicio
  */
  public dateStart: Date;

  /**
  * Fecha fin
  */
  public dateEnd: Date;

  /**
  * Fecha solicitud
  */
  public dateRequested: Date;

  /**
  * Nombre Solicitante
  */
  public nameApplicant : string;

  /**
  * Detalles
  */
  public details: string;
  private LoanInfo: FormGroup;


  constructor(private formBuilder: FormBuilder,public modalContent: NgbActiveModal) {
      this.LoanInfo = formBuilder.group({
        name: ['', Validators.required],
        dateStart: ['', Validators.required]
      });
   }

  ngOnInit() {
  }
  
  get f() { return this.LoanInfo.controls; }

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

}
