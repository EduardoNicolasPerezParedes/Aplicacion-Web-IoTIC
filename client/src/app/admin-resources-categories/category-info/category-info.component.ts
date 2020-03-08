import { Component, OnInit } from '@angular/core';
import { Category } from 'src/_models/category.model';
import { faTimes, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent implements OnInit {
  /**
   * Identificador de la Categoría
   */
  public static categoryId;

  /**
   * Icono de Cancelar
   */
  public faTimes = faTimes;

  /**
   * Icono de Actualizar
   */
  public faCheck = faCheck;

  /**
   * Icono de Editar
   */
  public faPen = faPen;

   /**
    * Contiene la información de la Categoría
    */
  public category: Category;

  /**
   * ¿Se puede editar el formulario?
   */
  public isEditable: boolean;

  /**
   * Formulario de Categoría
   */
  private categoryForm: FormGroup;

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
    this.setCategory();
  }

  ngOnInit() {
  }

  get f() { return this.categoryForm.controls; }

  /**
   * Obtiene y setea la categoría
   */
  private setCategory() {
    // TODO: Obtener la información del servidor
    this.category = new Category();
    this.category.name = "Nombre Categoría";
  }

  /**
   * Cierra el modal
   */
  public close() {
    this.modal.close();
  }

  /**
   * Invocada al dar click en Cancelar
   */
  public cancelOnClick() {
    this.setCategory();
    this.isEditable = !this.isEditable;
  }

  public updateOnClick() {
    // TODO: Actualizar la categoría
    alert('Not implemented!');
  }
}
