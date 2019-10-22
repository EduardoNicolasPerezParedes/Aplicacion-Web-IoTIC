import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * Icono del Correo
   */
  faEnvelope = faEnvelope;

  /**
   * Icono de la Contraseña
   */
  faKey = faKey;

  /**
   * Formulario de Inicio de Sesión
   */
  loginForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }

    /**
     * TODO:  - Hacer uso del servicio authService para iniciar sesión.
     */

     this.router.navigateByUrl("home");
  }
}
