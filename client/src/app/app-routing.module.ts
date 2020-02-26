import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { ContactComponent } from './contact/contact.component';
import { AdminSemilleroComponent } from './admin-semillero/admin-semillero.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'course/:id', component: CourseComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminSemilleroComponent },
  { path: 'admin/messages', component: AdminSemilleroComponent },
  { path: 'admin/courses', component: AdminSemilleroComponent },
  { path: 'admin/events', component: AdminSemilleroComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
