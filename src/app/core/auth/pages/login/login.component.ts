import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { IResult } from '../../../../shared/models/IResult';
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
      username: ['', [Validators.required]],
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

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.auth.login(username, password).subscribe({
        next: (res: IResult<string>) => {
          if (res.isSuccess) {

            // this.router.navigate(['/admin/usuarios'])
            Swal.fire({
              icon: "success",
              title: "Acceso concedido",
              text: "Accediendo al sistema",
              timer: 1000,
              showConfirmButton: false
            }).then(() => {
              //
              this.router.navigate(['/venta/venta'])
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.error,
              timer: 3000,
              showConfirmButton: false
            });
          }
        },
        error: (err: any) => {
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }


}
