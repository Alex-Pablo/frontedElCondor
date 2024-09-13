import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { IResult } from '../../../../../shared/models/IResult';
import { IRole } from '../../../../../shared/models/IRole';
import { IUserStatus } from '../../../../../shared/models/IUserStatus';
import { publish } from 'rxjs';

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
  constructor(public _matDialogRef: MatDialogRef<EditUserComponent> @ing, private fb: FormBuilder, private authService: AuthService) {

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


    this.authService.getUserById(idNum).subscribe((data) => {
      if (data.isSuccess) {
        console.log(data.value);//aqui puedes ver los datos qye se trae la baase de daots
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

}
