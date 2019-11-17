import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/_services/course.service';
import { Course } from 'src/_models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  /**
   * Contiene los cursos disponibles
   */
  public courses: Array<Course>;

  /**
   * ¿Hay cursos disponibles?
   */
  public weHaveCourses;

  constructor(private courseService: CourseService, private router: Router) { 
    this.setCourses().then(() => {
        this.weHaveCourses = this.courses.length > 0;
      }
    );
  }

  ngOnInit() {
  }

  public async setCourses() {
    let res = await this.courseService.list().toPromise();
    let courses = res as Array<any>;
    this.courses = new Array<Course>();

    courses.forEach(course => {
      this.courses.push(new Course(
        course._id,
        course.name,
        course.description,
        course.teacher,
        course.starts_at,
        course.ends_at
      ));
    });
  }

  public showCourse(id: string) {
    this.router.navigateByUrl(`course/${id}`);
  }
}
