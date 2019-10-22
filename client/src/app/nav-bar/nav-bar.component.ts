import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Es invocada al dar click en 'Registrarse'
   */
  signupOnClick(): void {
    this.router.navigateByUrl("register");
  }

  /**
   * Es invocada al dar click en 'Iniciar Sesión'
   */
  loginOnClick(): void {
    this.router.navigateByUrl("login");
  }
}
