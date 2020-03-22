import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  contactActiveRoute: boolean;
  aboutActiveRoute: boolean;
  resourcesActiveRoute: boolean;
  homeActiveRoute: boolean;

  constructor(private router: Router) { 
    let url = this.router.url;
    url = url.split('?')[0];
    switch(url) {
      case '/contact':
        this.contactActiveRoute = true;
        break;
      case '/about':
        this.aboutActiveRoute = true;
        break;
      case '/resources':
        this.resourcesActiveRoute = true;
        break;
      default:
        this.homeActiveRoute = true;
        break;
    }
  }

  ngOnInit() {
  }
}
