import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  /**
   * Formulario de Categoría
   */
  private categoryForm: FormGroup;

  public submitted: boolean;

  constructor(
    private fromBuilder: FormBuilder,
    private modal: NgbActiveModal
  ) { 
    this.categoryForm = this.fromBuilder.group({
      name: ['', Validators.required],
      question: [false, Validators.required],
      parent: [null, Validators.required],
      state: [false, Validators.required]
    });
  }

  ngOnInit() {
  }

  get f() { return this.categoryForm.controls; }

  public cancelOnClick() {
    this.modal.close();
  }

  public onSubmit() {
    this.submitted = true;
    if (this.categoryForm.invalid) { return }
  }
}
