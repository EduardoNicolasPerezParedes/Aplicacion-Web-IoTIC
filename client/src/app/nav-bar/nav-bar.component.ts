import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCog, faBars, faSignOutAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';

import { AuthHelper } from './../../_helpers/auth.helper';
import { AuthService } from 'src/_services/auth.service';
import { User } from 'src/_models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  /**
   * Icono de Ajustes
   */
  public faCog = faCog;

  faSignOutAlt = faSignOutAlt;

  faClipboard = faClipboard

  /**
   * Icono de Menú Hamburguesa
   */
  public faBars = faBars;

  /**
   * Controla el menú hamburguesa
   */
  public isCollapsed = true;

  /**
   * ¿Hay una sesión iniciada?
   */
  public loggedIn = false;

  /** 
   * Contiene al usuario de la sesión actual
  */
  public user: User;

  /** 
   * ¿Es /home la ruta activa?
  */
  public homeActiveRoute = false;

  /** 
   * ¿Es /contact la ruta activa?
  */
  public contactActiveRoute = false;

  /** 
   * ¿Es /contact la ruta activa?
  */
  public aboutActiveRoute = false;

  /** 
   * ¿Es /contact la ruta activa?
  */
  public resourceActiveRoute = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.user = AuthHelper.getLoggedUser();
    this.loggedIn = this.user ? true : false;

    let url = this.router.url;
    switch(url) {
      case '/contact':
        this.contactActiveRoute = true;
        break;
      case '/about':
        this.aboutActiveRoute = true;
        break;
      case '/resource':
        this.resourceActiveRoute = true;
        break;
      default:
        this.homeActiveRoute = true;
        break;
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

  /**
   * Es invocada al dar click en 'Admin Dashboard'
   */
  dashboardOnClick(): void {
    this.router.navigateByUrl("admin");
  }
}
