import { Component, OnInit } from '@angular/core';
import { Category } from 'src/_models/category.model';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  /**
   * Icono de Categorías
   */
  public faCaretDown = faCaretDown;

  /**
   * Categorías disponibles
   */
  public categories: Array<Category>;

  /**
   * Recursos disponibles
   */
  public resources: Array<number>;

  isCollapsed = true;

  constructor() { 
    this.categories = new Array<Category>();
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())
    this.categories.push(new Category())

    this.resources = new Array<number>();
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
    this.resources.push(1)
  }

  ngOnInit() {
  }

  public resourceOnClick() {
    // TODO: Mostrar información del recurso
    alert('Not implemented!');
  }
}
