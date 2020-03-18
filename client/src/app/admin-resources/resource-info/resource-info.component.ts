import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimes, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { ResourceService } from 'src/_services/resource.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { Resource } from 'src/_models/resource.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resource-info',
  templateUrl: './resource-info.component.html',
  styleUrls: ['./resource-info.component.css']
})
export class ResourceInfoComponent implements OnInit {
  /**
   * Icono de Cerrar
   */
  private faTimes = faTimes;

  /**
   * Icono de Cerrar
   */
  private faPen = faPen;

  /**
   * Icono de Cerrar
   */
  private faCheck = faCheck;

  /**
   * Identificador del recurso
   */
  public static resourceId: string;

  /**
   * Contiene la información del Recurso
   */
  private resource: Resource;

  /**
   * Formualrio del Recurso
   */
  private resourceForm: FormGroup;

  /**
   * ¿Se puede editar el recurso?
   */
  private isEditable: boolean;

  /**
   * ¿El recurso se encuentra disponible?
   */
  private isAvailable: boolean;

  constructor(
    private modal: NgbActiveModal,
    private resourceService: ResourceService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [null, Validators.required],
      category: [null, Validators.required]
    });
    this.setResource();
  }

  /**
   * Cierra el modal
   */
  private close() { this.modal.close(); }

  /**
   * Invocada al dar click en Cancelar
   */
  private cancelOnClick() {
    this.isEditable = false;
    this.setResource();
  }

  /**
   * Invocada al dar click en Actualizar
   */
  private updateOnClick() {
    // TODO: Actualizar el recurso
    alert('Not implemented!');
  }

  /**
   * Obtiene y setea la información del recurso
   */
  private async setResource() {
    try {
      let res = await this.resourceService.get(ResourceInfoComponent.resourceId).toPromise();
      this.resource = Resource.fromJSON(res);
      this.resourceForm.controls.name.setValue(this.resource.name);
      this.resourceForm.controls.description.setValue(this.resource.description);
      this.resourceForm.controls.quantity.setValue(this.resource.quantity);
      this.isAvailable = this.resource.available;
    } catch (err) {
      new MsgHelper().showError(err.message);
    }
  }
}
