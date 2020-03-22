import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CourseComponent } from './course/course.component';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './main/main.component';
import { UsComponent } from './us/us.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MainComponent },
  { path: 'us', component: UsComponent},
  { path: 'course/:id', component: CourseComponent }, // TODO: Cambiar ruta: el curso se muestra con un modal
  { path: 'contact', component: MainComponent },
  { path: 'resources:c', component: MainComponent,  },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/members/pending', component: AdminComponent },
  { path: 'admin/messages', component: AdminComponent },
  { path: 'admin/courses', component: AdminComponent },
  { path: 'admin/events', component: AdminComponent },
  { path: 'admin/resources', component: AdminComponent },
  { path: 'admin/categories', component: AdminComponent },
  { path: 'admin/news', component: AdminComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
