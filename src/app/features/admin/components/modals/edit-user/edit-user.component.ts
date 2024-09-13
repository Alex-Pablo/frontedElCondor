import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { IResult } from '../../../../../shared/models/IResult';
import { IRole } from '../../../../../shared/models/IRole';
import { IUserStatus } from '../../../../../shared/models/IUserStatus';
import { publish, retry } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {


  roles: IRole[] | undefined;
  userstatus: IUserStatus[] | undefined;
  loginForm: FormGroup;
  constructor(public _matDialogRef: MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private authService: AuthService) {

    this.loginForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
          profileImg: data.value?.profile
        })
      }
    })
  }

  onSubmit() {

  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.loginForm.patchValue({
      profileImg: file
    });
  }
  getImgProfile() {
    return this.loginForm.value.profileImg
  }
}
