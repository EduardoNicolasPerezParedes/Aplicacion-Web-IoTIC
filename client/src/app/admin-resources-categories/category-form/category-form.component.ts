import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/_services/category.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { Category } from 'src/_models/category.model';

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

  /**
   * ¿Se ha dado click en Registrar?
   */
  private submitted: boolean;

  /**
   * Categorías registradas
   */
  private categories: Array<Category>;

  constructor(
    private fromBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private categoryService: CategoryService
  ) { 
    this.categoryForm = this.fromBuilder.group({
      name: ['', Validators.required],
      available: [false, Validators.required],
      question: [false, Validators.required],
      parent: [null],
      state: [false, Validators.required]
    });
  }

  ngOnInit() {
  }

  get f() { return this.categoryForm.controls; }

  /**
   * Obtiene y setea la categorías
   */
  private async getCategories() {
    try {
      let res = await this.categoryService.list().toPromise();
      this.categories = new Array<Category>();
    } catch (err) {
      new MsgHelper().showError(err.message);
    }
  }

  /**
   * Cierra el modal
   */
  private close() {
    this.modal.close();
  }

  /**
   * Invocada al dar click en Agregar
   */
  public async onSubmit() {
    this.submitted = true;
    if (this.categoryForm.invalid) { return }

    try {
      let category = new Category();
      category.name = this.categoryForm.controls.name.value;
      category.available = this.categoryForm.controls.available.value
      category.parent = null;

      let res = await this.categoryService.create(category).toPromise();
      new MsgHelper().showSuccess('Categoría agregada exitosamente');
      this.close();
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
  }
}
