import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt, } from '@fortawesome/free-solid-svg-icons';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { LoanService } from 'src/_services/loan.service';
import { Loan } from 'src/_models/loan.model';
import { ResourceLoanedService } from 'src/_services/resourceLoaned.service';
import { ResourceService } from 'src/_services/resource.service';
import { ResourceLoaned } from 'src/_models/resourceLoaned.model';
import { Resource } from 'src/_models/resource.model';

interface infoTable  {
  resourceName : string ,
  quantity : number
};

@Component({
  selector: 'app-loans-form',
  templateUrl: './loans-form.component.html',
  styleUrls: ['./loans-form.component.css']
})
export class LoansFormComponent implements OnInit {

  /**
  * Icono de Calendario
  */
  public faCalendarAlt = faCalendarAlt;
  /**
  * Información del prestamo
  */
  public static loan : Loan;
  public auxLoan : Loan; 
  /**
   * Información de los recursos a mostrar
   */
  public infoResource : Array<infoTable>;
  private LoansForm: FormGroup;
  /**
   * Información para aprobar el prestamo
   */
  dateEnd = new FormControl('', [Validators.required]);
  imgResource = new FormControl('',[Validators.required]);
  imgFormat = new FormControl();

  constructor(public modalContent: NgbActiveModal,
    private formBuilder: FormBuilder,
    private serviceLoan : LoanService,
    private serviceResourcesLoaned : ResourceLoanedService,
    private serviceResource : ResourceService,) {

      this.infoResource = new Array<infoTable>();
      this.auxLoan = new Loan();
   }

  ngOnInit() {
    this.setResourceLoaned();
  }

  get f() { return this.LoansForm.controls; }

    /**
   * Obtiene los id de los recursos pertenecientes al prestamo
   */
  private async setResourceLoaned(){
    this.auxLoan = LoansFormComponent.loan;
    let res: any = await this.serviceResourcesLoaned.get_by_loanId(this.auxLoan.loanId).toPromise();
    res.forEach((e: Object) => {
      this.getInfo(ResourceLoaned.fromJSON(e).resourceId,ResourceLoaned.fromJSON(e).quantity);
    });  

  }
  /**
   * Obtiene los nombres de los recursos
   */
  private async getInfo( id :string,quantity:number){
    console.log("METODO GET INFO");
    let rec: any =await  this.serviceResource.get(id).toPromise();
    console.log("NOMBRE RECURSO: "+Resource.fromJSON(rec).name);
    let info : infoTable= {
      resourceName : Resource.fromJSON(rec).name,
      quantity : quantity
    };
    this.infoResource.push(info);
  }s
  /**
  * Llamado al metodo cerrar formulario
  */
  public cancelOnClick() {
    this.close();
  }

  /**
  * Cierra el formulario
  */
  private close() {
    this.modalContent.close();
  }
  /**
   * Invocada al dar click en Aprobar
   * @param id Identificador del curso
   */
  public async onSubmit() { 

    this.auxLoan.dateEnd = this.dateEnd.value;
    this.auxLoan.image_resource_link = this.imgResource.value;
    this.auxLoan.image_format_link = this.imgFormat.value;
    this.auxLoan.state = 1;

    console.log("FECHA FIN: "+this.dateEnd.value);
    console.log("link recurso: "+this.imgResource.value);
    console.log("link format: "+this.auxLoan.image_format_link);

    try {
      let res = await this.serviceLoan.update(this.auxLoan.loanId, this.auxLoan).toPromise();
      new MsgHelper().showSuccess("Prestamo aprobado exitosamente");
    } catch (err) {
      if (err.status == 422) {
        new MsgHelper().showError(err.error.error);
      } else {
        new MsgHelper().showError(err.message);
      }
    }
    this.close();
  }
  
}

