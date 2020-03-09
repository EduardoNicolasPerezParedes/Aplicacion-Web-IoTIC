import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  private submitted: boolean;

  constructor(private formBuilder: FormBuilder, private modal: NgbActiveModal) { 
    this.submitted = false;
    this.resourceForm = formBuilder.group({
      // TODO: Agregar el campo 'Imagen' 
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

  public onSubmit() {
    this.submitted = true;
  }

  public cancelOnClick() {
    this.modal.close();
  }
}
