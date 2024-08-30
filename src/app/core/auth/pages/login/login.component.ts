import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { AnimationBuilder } from '@angular/animations';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  imagePath: string = '/img/prueba.png';
  isLoading: boolean = false;
  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



onSubmit() {
  this.formSubmitted = true;

  if (this.loginForm.valid) {
    Swal.fire({
      title: 'Iniciando Sesión',
      text: 'Espere por favor....',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    Swal.showLoading();

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.login(email, password).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: "success",
          title: "Acceso concedido",
          text: "Accediendo al sistema",
          timer: 1000,
          showConfirmButton: false
        }).then(() => {
          //
        });
      },
      error: (error: any) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Correo o contraseña incorrecta",
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  } else {
    console.log('Form is not valid');
  }
}


}
