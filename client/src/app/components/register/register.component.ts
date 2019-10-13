import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faCalendarAlt, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Iconos
  faUser = faUser;
  faEnvelope = faEnvelope;
  faCalendarAlt = faCalendarAlt;
  faGraduationCap = faGraduationCap;

  user = new User(
    '',
    '',
    '',
    false
  );
  semesters = ['1','2','3','4','5','6','7','8','9','10'];

  ngOnInit() {
  }
}
