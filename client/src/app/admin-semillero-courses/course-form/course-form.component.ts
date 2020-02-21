import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from 'src/_services/course.service';
import { Course } from 'src/_models/course.model';
import { MsgHelper } from 'src/_helpers/msg.helper';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  /**
   * Icono de Fecha Inicio y Fecha Fin
   */
  faCalendarAlt = faCalendarAlt;

  /**
   * Curso a ser registrado
   */
  public course: Course;

  constructor(public modalContent: NgbActiveModal, private courseService: CourseService) { 
    this.course = new Course();
  }

  ngOnInit() {
  }

  /**
   * Invocada al dar click en Cancelar
   */
  public cancelOnClick() {
    this.modalContent.close();
  }

  /**
   * Invocada al dar click en Agregar
   */
  public async addOnClick() {
    let msg = new MsgHelper();
    try {
      await this.courseService.create(this.course).toPromise();
    } catch(err) {
      if (err.status == 422) { msg.showError(err.error.error); }
    }
  }
}
