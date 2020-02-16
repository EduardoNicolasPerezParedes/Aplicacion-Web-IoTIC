import { Component, OnInit } from '@angular/core';
import { Course } from 'src/_models/course.model';
import { CourseService } from 'src/_services/course.service';
import { faPlus, faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseFormComponent } from './course-form/course-form.component';
import { MsgHelper } from 'src/_helpers/msg.helper';

@Component({
  selector: 'app-admin-semillero-courses',
  templateUrl: './admin-semillero-courses.component.html',
  styleUrls: ['./admin-semillero-courses.component.css']
})
export class AdminSemilleroCoursesComponent implements OnInit {
  /**
   * Icono de Añadir Curso
   */
  faPlus = faPlus;

  /**
   * Icono de Ver Curso
   */
  faEye = faEye;


  /**
   * Icono de Editar Curso
   */
  faPen = faPen;

  /**
   * Icono de Eliminar Curso
   */
  faTrashAlt = faTrashAlt;

  /**
   * Contiene todos los cursos
   */
  public courses: Array<Course>;

  /**
   * ¿Hay cursos registrados?
   */
  public weHaveCourses: boolean;

  constructor(private courseService: CourseService, private modalService: NgbModal) { }

  ngOnInit() {
    this.setCourses().then(() => {
      this.weHaveCourses = this.courses.length > 0;
    });
  }

  public async setCourses() {
    let res:any = await this.courseService.list().toPromise();
    this.courses = new Array<Course>();

    res.forEach(course => {
      this.courses.push(Course.fromJSON(course))
    });
  }

  public async addOnClick() {
    this.modalService.open(CourseFormComponent);
  }

  public showOnClick() {
    
  }

  public async deleteOnClick(id: string) {
    let msg = new MsgHelper();
    let res = await msg.showConfirmDialog('Confirmación', '¿Está seguro que desea eliminar el curso?');
    
    if (res.value) {
      try {
        await this.courseService.delete(id).toPromise();
      } catch(err) {
        if (err.status == 200) {
          msg.showSuccess('El curso fue eliminado exitosamente');
          this.setCourses();
          return;
        }
        msg.showError('El curso no pudo ser eliminado');
      }
    }
  }
}
