import { Component } from '@angular/core';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule}  from '@angular/material/button'
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { from, pairs, retry, subscribeOn } from 'rxjs';
import { AuthService } from '../../../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register-modal',
  standalone: true,
  imports: [MatButtonModule , MatDialogModule,
    ReactiveFormsModule,
    CommonModule ],
  templateUrl: './user-register-modal.component.html',
  styleUrl: './user-register-modal.component.scss'
})
export class UserRegisterModalComponent {
  loginForm: FormGroup;
  constructor(public _matDialogRef: MatDialogRef<UserRegisterModalComponent>,private fb: FormBuilder, private authService: AuthService ){

    this.loginForm = this.fb.group({
      firstname : ['', [Validators.required]],
      lastname : ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      profileImg: [null]
    });
  }

  generatePassword(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?¿';
    let password  = "";

    for (let i= 0; i< 9; i++) {
      const aleatorio = Math.floor(Math.random()* characters.length);
      password += characters.charAt(aleatorio);
    }
    console.log(password);

    this.loginForm.patchValue({password: password})
  }

  onSubmit(){
    if(this.loginForm.valid){

      Swal.fire({
        title: 'Iniciando Sesión',
        text: 'Espere por favor....',
        showConfirmButton: false,
        allowOutsideClick: false
      });
      Swal.showLoading();
      const formData = new FormData();
      console.log(this.loginForm.value.ID_Estado);


      formData.append('Email', this.loginForm.value.email),
      formData.append('Password', this.loginForm.value.password),
      formData.append('PhoneNumber', this.loginForm.value.phoneNumber),
      formData.append('Firstname', this.loginForm.value.firstname),
      formData.append('Lastname', this.loginForm.value.lastname),
      formData.append('Profile', this.loginForm.value.profileImg),

      formData.append('ID_role', this.loginForm.value.role),
      formData.append('ID_Estado', this.loginForm.value.estado)


      this.authService.register(formData).subscribe({
        next:(responsse)=>{
          Swal.fire({
            icon: "success",
            title: "Exito",
            text: "Usuario creado",
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this._matDialogRef.close();
          });

        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.error,
            timer: 4000,
            showConfirmButton: false
          });
        }
      })
    }else{
      console.log('Campos necesarios');

    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.loginForm.patchValue({
      profileImg: file
    });
  }

  toNumber(value:any){
    const num = Number(value);
    return isNaN(num) ? 0: num;
  }
}
