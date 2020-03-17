import { Component, OnInit } from '@angular/core';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { Resource } from 'src/_models/resource.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceService } from 'src/_services/resource.service';
import { MsgHelper } from 'src/_helpers/msg.helper';

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

  constructor(
    private modalService: NgbModal,
    private resourceService: ResourceService
    ) { 
    this.setResources();
  }

  ngOnInit() {
  }

  /**
   * Obtiene y setea los recursos
   */
  private async setResources() {
    try {
      this.resources = new Array<Resource>();
      let res:any = await this.resourceService.list().toPromise();

      res.forEach(r => {
        this.resources.push(Resource.fromJSON(r));
      });
    } catch (err) {
      new MsgHelper().showError(err.message);
    }
  }

  /**
   * Invocada al dar click en Mostrar Recurso
   * @param id Identificador del Recurso
   */
  public showOnClick(id: string) {

  }

  /**
   * Invocada al dar click en Agregar Recurso
   */
  public addOnClick() {
    this.modalService.open(ResourceFormComponent);
  }
}
