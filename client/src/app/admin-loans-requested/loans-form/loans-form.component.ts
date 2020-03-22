import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt, } from '@fortawesome/free-solid-svg-icons';
import { MsgHelper } from 'src/_helpers/msg.helper';

@Component({
  selector: 'app-loans-form',
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.css']
})
export class LoansFormComponent implements OnInit {

  private LoansForm: FormGroup;

    /**
   * Icono de Calendario
   */
  public faCalendarAlt = faCalendarAlt;


  constructor(public modalContent: NgbActiveModal,private formBuilder: FormBuilder) {
    this.LoansForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  get f() { return this.LoansForm.controls; }

  /**
  * Llamado al metodo cerrar formulario
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
   * Invocada al dar click en Aprobar
   * @param id Identificador del curso
   */
  public async addOnClick(id: string) {
    let msg = new MsgHelper();
    let res = await msg.showConfirmDialog('¿Está seguro?', 'El prestamo será aprobado');
    
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

