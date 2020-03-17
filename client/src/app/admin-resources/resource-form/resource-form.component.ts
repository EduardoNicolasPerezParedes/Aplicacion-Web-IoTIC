import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileHelper } from 'src/_helpers/file.helper';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { ResourceService } from 'src/_services/resource.service';
import { Resource } from 'src/_models/resource.model';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
  /**
   * Formulario del Recurso
   */
  private resourceForm: FormGroup;

  /**
   * ¿Se ha dado click en Agregar?
   */
  private submitted: boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private modal: NgbActiveModal,
    private fileHelper: FileHelper,
    private resourceService: ResourceService) { 
    this.submitted = false;
    this.resourceForm = formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [null, Validators.required],
      available: [false, Validators.required],
      category: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  get f() { return this.resourceForm.controls; }

  /**
   * Invocada al dar click en Agregar
   */
  private async onSubmit() {
    this.submitted = true;
    //if (this.resourceForm.invalid || this.fileHelper.file === null) { return; }

    try {
      let resource = new Resource();
      resource.name = this.resourceForm.controls.name.value;
      resource.description = this.resourceForm.controls.description.value;
      resource.quantity = this.resourceForm.controls.quantity.value;
      resource.available = this.resourceForm.controls.available.value;

      let res: any = await this.resourceService.create(resource).toPromise();
      // Se sube la imagen del recurso
      await this.fileHelper.upload(4, res._id);
      new MsgHelper().showSuccess('El recurso fue agregado exitosamente');
    } catch (err) {
      new MsgHelper().showError(err.message);
    }
  }

  /**
   * Invocada al dar click en Cancelar
   */
  private cancelOnClick() {
    this.modal.close();
  }
}
