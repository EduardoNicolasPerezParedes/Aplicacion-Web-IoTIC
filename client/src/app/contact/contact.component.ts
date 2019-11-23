import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faEnvelope, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    /**
   * Icono del nombre
   */
  faUser = faUser;

    /**
   * Icono del Correo
   */
  faEnvelope = faEnvelope;

  /**
   * Icono del Correo
   */
  faPhone = faPhone;

  /**
   * Formulario de contacto
   */
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  /**
   * Para acceder a los atributos del formulario de una manera más simple
   */
  get f() { return this.contactForm.controls; }
}
