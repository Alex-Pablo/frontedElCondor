import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BtnAcceptComponent } from '../../../../../shared/components/btn-accept/btn-accept.component';
import { BtnCloseComponent } from '../../../../../shared/components/btn-close/btn-close.component';
import { InputFieldComponent } from '../../../../../shared/components/input-field/input-field.component';
import { InputSelectComponent } from '../../../../../shared/components/input-select/input-select.component';
import { IRole } from '../../../../../shared/models/IRole';
import { AuthService } from '../../../../../core/services/auth.service';
import { IResult } from '../../../../../shared/models/IResult';
import { ImageUploaderComponent } from '../../../../../shared/components/image-uploader/image-uploader.component';
import { MatRadioModule } from '@angular/material/radio'
import { SweealertService } from '../../../../../core/services/sweealert.service';
@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [BtnAcceptComponent,
    BtnCloseComponent,
    InputFieldComponent,
    InputSelectComponent,
    MatDialogModule,
    ReactiveFormsModule,
    ImageUploaderComponent,
    MatRadioModule
  ],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent {
  private sAuth = inject(AuthService)
  private sSweetAlert = inject(SweealertService);
  _MatDialgoRef = inject(MatDialogRef<UserPopupComponent>)
  _fb = inject(FormBuilder)
  isEditMode: boolean;
  loginForm: any;
  roles!: IRole[];
  imgUrl: any; //es una url que se pasa para visualiar la img,
  fileToUpload: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) {
    this.isEditMode = !!data.payload;

    this.loginForm = this._fb.group({
      firstname: [data.payload?.firstname || '', [Validators.required]],
      lastname: [data.payload?.lastname || '', [Validators.required]],
      phoneNumber: [data.payload?.phoneNumber || '', [Validators.required]],
      email: [data.payload?.email || '', [Validators.required, Validators.email]],
      role: [data.payload?.id_role || '', [Validators.required]],
      status: [data.payload?.status || 'A', [Validators.required]],
      profileImg: [null]
    });
    this.imgUrl = data.payload?.profile
  }

  ngOnInit(): void {
    this.getRole();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.sSweetAlert.showLoading();
      const formData = new FormData();
      formData.append('Email', this.loginForm.value.email),
        formData.append('PhoneNumber', this.loginForm.value.phoneNumber),
        formData.append('Firstname', this.loginForm.value.firstname),
        formData.append('Lastname', this.loginForm.value.lastname),
        formData.append('Profile', this.loginForm.value.profileImg),
        formData.append('ID_role', this.loginForm.value.role),
        formData.append('Status', this.loginForm.value.status)
      if (this.isEditMode) {

        console.log('editar');
        const idUser = this.data.payload.id;
        if (idUser > 0) {
          this.sAuth.modifyUser(formData, idUser).subscribe((data: IResult<string>) => {
            if (data.isSuccess) {
              this.sSweetAlert.closeLoading();
              this._MatDialgoRef.close(true)
            } else {
              this.sSweetAlert.showError(data.error || 'Error  al editar el usuario')
            }
          })
        }

      } else {

        console.log('crear usuario');
        this.sAuth.register(formData).subscribe((data: IResult<boolean>) => {
          if (data.isSuccess) {
            this.sSweetAlert.closeLoading();
            this._MatDialgoRef.close(true)
          } else {
            this.sSweetAlert.showError(data.error || "Error al crear el usuario")
          }
        })

      }
    }
  }




  getFormControl(controlName: string): FormControl | null {
    const control = this.loginForm.get(controlName);
    return control instanceof FormControl ? control : null;
  }

  getRole() {
    this.sAuth.getRoles().subscribe((data: IResult<IRole[]>) => {
      if (data.isSuccess) {
        this.roles = data.value!
      }
    })
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
