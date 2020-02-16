import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  /**
   * Controla el menú hamburguesa
   */
  public isCollapsed;

  constructor(private router: Router, private authService: AuthService) { 
    this.isCollapsed = true;
  }

  ngOnInit() { }

  coursesOnClick(): void {
    this.router.navigateByUrl("admin/courses");
  }

  messagesOnClick(): void {
    this.router.navigateByUrl("admin/messages");
  }

  logoutOnClick(): void {
    this.authService.logout();
    this.router.navigateByUrl("home");
  }

  backOnClick(): void {
    this.router.navigateByUrl("home");
  }
}
