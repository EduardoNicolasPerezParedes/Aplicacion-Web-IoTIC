import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthHelper } from './../../_helpers/auth.helper';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  /**
   * Controla el menú hamburguesa
   */
  isCollapsed = true;

  /**
   * ¿El usuario es Administrador?
   */
  isAdmin = false;

  /**
   * ¿Hay una sesión iniciada?
   */
  loggedIn = false;

  /**
   * Nombre del usuario de la sesión actual
   */
  userName = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    let user = AuthHelper.getLoggedUser();
    this.loggedIn = user ? true : false;

    if (this.loggedIn) {
      this.userName = user.name;
    }
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

  /**
   * Es invocada al dar click en 'Cerrar Sesión'
   */
  logoutOnClick(): void {
    this.authService.logout();
    location.reload();
  }
}
