import { Component, OnInit } from '@angular/core';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { Resource } from 'src/_models/resource.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceFormComponent } from './resource-form/resource-form.component';

@Component({
  selector: 'app-admin-resources',
  templateUrl: './admin-resources.component.html',
  styleUrls: ['./admin-resources.component.css']
})
export class AdminResourcesComponent implements OnInit {
  /**
   * Icono de Agregar Recurso
   */
  public faPlus = faPlus;

  /**
   * Icono de Mostrar Recurso
   */
  public faEye = faEye;

  /**
   * Recursos registrados
   */
  public resources: Array<Resource>;

  constructor(private modalService: NgbModal) { 
    this.resources = new Array<Resource>();
    this.resources.push(new Resource());
    this.resources.push(new Resource());
    this.resources.push(new Resource());
    this.resources.push(new Resource());
    this.resources.push(new Resource());
  }

  ngOnInit() {
  }

  /**
   * Invocada al dar click en Mostrar Recurso
   * @param id Identificador del Recurso
   */
  public showOnClick(id: string) {

  }

  /**
   * Invocada al dar click en Agregar Producto
   */
  public addOnClick() {
    this.modalService.open(ResourceFormComponent);
  }
}
