import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  /**
   * Opciones disponibles para el usuario.
   */
  public OPTIONS = {
    EVENTS: 0,
    COURSES: 1,
    NEWS: 2,
    MSG: 3,
    RESOURCES: 4,
    CATEGORIES: 5
  };

  /**
   * Opción elegida por el usuario.
   */
  public selectedOption;

  constructor(private router: Router) {  }

  ngOnInit() {
    let url = this.router.url;
    
    switch(url) {
      case '/admin/events':
        this.selectedOption = this.OPTIONS.EVENTS;
        break;
      case '/admin/courses':
        this.selectedOption = this.OPTIONS.COURSES;
        break;
      case '/admin/messages':
        this.selectedOption = this.OPTIONS.MSG;
        break;
      case '/admin/resources':
        this.selectedOption = this.OPTIONS.RESOURCES;
        break;
      case '/admin/categories':
        this.selectedOption = this.OPTIONS.CATEGORIES;
        break;
    }
  }
}
