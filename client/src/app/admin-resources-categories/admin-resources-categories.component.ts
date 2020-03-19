import { Component, OnInit } from '@angular/core';
import { faPlus, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/_models/category.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryInfoComponent } from './category-info/category-info.component';
import { CategoryService } from 'src/_services/category.service';
import { MsgHelper } from 'src/_helpers/msg.helper';

@Component({
  selector: 'app-admin-resources-categories',
  templateUrl: './admin-resources-categories.component.html',
  styleUrls: ['./admin-resources-categories.component.css']
})
export class AdminResourcesCategoriesComponent implements OnInit {
  /**
   * Icono de Agregar Categoría
   */
  public faPlus = faPlus;

  /**
   * Icono de Ver Más
   */
  public faEye = faEye;

  /**
   * Icono de Eliminar
   */
  public faTrashAlt = faTrashAlt;

  /**
   * Categorías registradas
   */
  public categories: Array<Category>;

  constructor(
    private modalService: NgbModal,
    private categoryService: CategoryService
    ) {
    this.categories = new Array<Category>();
    this.setCategories();
  }

  ngOnInit() {
  }

  /**
   * Obtiene y setea las categorías
   */
  private async setCategories() {
    try {
      let res: any = await this.categoryService.list().toPromise();
      res.forEach(cat => { this.categories.push(Category.fromJSON(cat)); });
    } catch (err) {
      new MsgHelper().showError(err.error);
    }
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
