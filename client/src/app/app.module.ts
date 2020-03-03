import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/_services/user.service';
import { AuthService } from 'src/_services/auth.service';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseService } from 'src/_services/course.service';
import { CourseComponent } from './course/course.component';
import { ContactComponent } from './contact/contact.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSemilleroComponent } from './admin-semillero/admin-semillero.component';
import { AdminSemilleroMsgComponent } from './admin-semillero-msg/admin-semillero-msg.component';
import { MessageService } from 'src/_services/message.service';
import { AdminSemilleroCoursesComponent } from './admin-semillero-courses/admin-semillero-courses.component';
import { CourseFormComponent } from './admin-semillero-courses/course-form/course-form.component';
import { CourseInfoComponent } from './admin-semillero-courses/course-info/course-info.component';
import { CourseSharedService } from 'src/_services/course.shared.service';
import { AdminSemilleroEventsComponent } from './admin-semillero-events/admin-semillero-events.component';
import { EventService } from 'src/_services/event.service';
import { EventFormComponent } from './admin-semillero-events/event-form/event-form.component';
import { EventSharedService } from 'src/_services/event.shared.service';
import { EventInfoComponent } from './admin-semillero-events/event-info/event-info.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { DateHelper } from 'src/_helpers/date.helper';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    CoursesComponent,
    CourseComponent,
    ContactComponent,
    AdminNavbarComponent,
    AdminSemilleroComponent,
    AdminSemilleroMsgComponent,
    AdminSemilleroCoursesComponent,
    CourseFormComponent,
    CourseInfoComponent,
    AdminSemilleroEventsComponent,
    EventFormComponent,
    EventInfoComponent,
    EventsComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AuthService,
    CourseService,
    MessageService,
    CourseSharedService,
    EventService,
    EventSharedService,
    DateHelper
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CourseFormComponent,
    CourseInfoComponent,
    EventFormComponent,
    EventInfoComponent,
    EventComponent
  ]
})
export class AppModule { }
