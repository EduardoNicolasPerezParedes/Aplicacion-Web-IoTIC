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
    let res:any = await this.courseService.list().toPromise();
    this.courses = new Array<Course>();

    res.forEach(course => {
      this.courses.push(Course.fromJSON(course));
    });
  }

  public showCourse(id: string) {
    this.router.navigateByUrl(`course/${id}`);
  }
}
