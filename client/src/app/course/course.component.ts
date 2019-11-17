import { Component, OnInit } from '@angular/core';
import { Course } from 'src/_models/course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  /**
   * Identificador del curso.
   */
  private id: string;

  /**
   * Contiene la información del curso.
   */
  course: Course;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.setCourse();
  }

  private setCourse() {
    // TODO: obtener el curso del servidor y setearlo a la variable 'course'
  }
}
