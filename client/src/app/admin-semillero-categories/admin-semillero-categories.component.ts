import { Component, OnInit } from '@angular/core';
import { faPlus, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/_models/category.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryInfoComponent } from './category-info/category-info.component';

@Component({
  selector: 'app-admin-semillero-categories',
  templateUrl: './admin-semillero-categories.component.html',
  styleUrls: ['./admin-semillero-categories.component.css']
})
export class AdminSemilleroCategoriesComponent implements OnInit {
  /**
   * Icono de Agregar Categoría
   */
  public faPlus = faPlus;

  /**
   * Icono de Ver Más
   */
  public faEye = faEye;

  public faTrashAlt = faTrashAlt;

  /**
   * Categorías registradas
   */
  public categories: Array<Category>;

  constructor(private modalService: NgbModal) {
    this.categories = new Array<Category>();
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
  }

  ngOnInit() {
  }

  /**
   * Invocada al dar click en Agregar
   */
  public addOnClick() {
    this.modalService.open(CategoryFormComponent);
  }

  /**
   * Invocada al dar click en Ver Más
   * @param id Identificador de la categoría
   */
  public showOnClick(id: string) {
    CategoryInfoComponent.categoryId = id;
    this.modalService.open(CategoryInfoComponent);
  }

  /**
   * Elimina una categoría
   * @param id Identificador de la Categoría
    */
  public deleteOnClick(id: string) {
    alert('Not implemented!');
  }
}
