import { Component, OnInit } from '@angular/core';
import { Course } from 'src/_models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/_services/course.service';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { User } from 'src/_models/user.model';
import { AuthHelper } from 'src/_helpers/auth.helper';

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
  public course: Course;

  /**
   * Contiene al usuario de la sesión actual.
   */
  public user: User;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.setCourse();
  }

  private setCourse() {
    this.courseService.get(this.id).toPromise().then((course) => {
      this.course = Course.fromJSON(course);
      this.user = AuthHelper.getLoggedUser();
    }).catch((err) => {
      console.error(err);
      this.router.navigateByUrl("home");
    });
  }
}
