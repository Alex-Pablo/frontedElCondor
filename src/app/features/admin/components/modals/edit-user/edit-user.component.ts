import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { IResult } from '../../../../../shared/models/IResult';
import { IRole } from '../../../../../shared/models/IRole';
import { IUserStatus } from '../../../../../shared/models/IUserStatus';
import Swal from 'sweetalert2';
import { BtnCloseComponent } from '../../../../../shared/components/btn-close/btn-close.component';
import { BtnAcceptComponent } from '../../../../../shared/components/btn-accept/btn-accept.component';
@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule,
    ReactiveFormsModule,
    CommonModule, BtnCloseComponent, BtnAcceptComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  fileToUpload: any;
  roles: IRole[] | undefined;
  userstatus: IUserStatus[] | undefined;
  loginForm: FormGroup;
  imgUrl: any;
  constructor(public _matDialogRef: MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private authService: AuthService) {

    this.loginForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      profileImg: [null]
    });
  }



  ngOnInit(): void {
    this.authService.getRoles().subscribe((data: IResult<IRole[]>) => {
      if (data.isSuccess) {
        this.roles = data.value
      }
    })

    this.authService.getUserStatus().subscribe((data: IResult<IUserStatus[]>) => {
      this.userstatus = data.value
    })


    this.authService.getUserById(this.data.id).subscribe((data) => {
      if (data.isSuccess) {
        console.log(data);

        this.loginForm.patchValue({
          email: data.value?.email,
          firstname: data.value?.firstname,
          lastname: data.value?.lastname,
          phoneNumber: data.value?.phoneNumber,
          role: Number(data.value?.iD_role),
          estado: data.value?.iD_Estado,
        })
        this.imgUrl = data.value?.profile;
      }
    })
  }

  onSubmit() {

    Swal.fire({
      title: '',
      text: 'Espere por favor....',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    Swal.showLoading();
    const formData = new FormData();

    formData.append('Password', this.loginForm.value.password),
      formData.append('PhoneNumber', this.loginForm.value.phoneNumber),
      formData.append('Firstname', this.loginForm.value.firstname),
      formData.append('Lastname', this.loginForm.value.lastname),
      formData.append('Profile', this.loginForm.value.profileImg),
      formData.append('ID_role', this.loginForm.value.role),
      formData.append('ID_Estado', this.loginForm.value.estado)

    this.authService.modifyUser(formData, this.data.id).subscribe((data) => {
      if (data.isSuccess) {
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Usuario modificado",
          timer: 1000,
          showConfirmButton: false
        }).then(() => {
          this._matDialogRef.close();
        });
      }
    })
  }

  onCloseModal() {
    this._matDialogRef.close();
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileToUpload = file;
    this.loginForm.patchValue({
      profileImg: file
    });

    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgUrl = e.target.result;
    };

    reader.readAsDataURL(this.fileToUpload);
  }
  getImgProfile() {
    return this.loginForm.value.profileImg
  }
}
