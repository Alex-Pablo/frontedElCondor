import { Component, Inject, inject } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { SweealertService } from '../../../../../core/services/sweealert.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRole } from '../../../../../shared/models/IRole';
import { IResult } from '../../../../../shared/models/IResult';
import { InputFieldComponent } from "../../../../../shared/components/input-field/input-field.component";
import { InputSelectComponent } from "../../../../../shared/components/input-select/input-select.component";
import { BtnCloseComponent } from "../../../../../shared/components/btn-close/btn-close.component";
import { BtnAcceptComponent } from "../../../../../shared/components/btn-accept/btn-accept.component";
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-proveedor-popup',
  standalone: true,
  imports: [InputFieldComponent, InputSelectComponent, BtnCloseComponent, BtnAcceptComponent, MatRadioModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './proveedor-popup.component.html',
  styleUrl: './proveedor-popup.component.scss'
})
export class ProveedorPopupComponent {
    private sAuth = inject(AuthService)
    private sSweetAlert = inject(SweealertService);
    _MatDialgoRef = inject(MatDialogRef<ProveedorPopupComponent>)
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
        empresa: [data.payload?.empresa || '', [Validators.required]],
        status: [data.payload?.status || 'A', [Validators.required]],
        address: [data.payload?.address || '', [Validators.required]],
        website: [data.payload?.website || '', [Validators.required]],
        account: [data.payload?.account || '', [Validators.required]],
        nameaccount: [data.payload?.nameaccount || '', [Validators.required]],
        namebanck: [data.payload?.namebanck || '', [Validators.required]],
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
          formData.append('PhoneNumber', this.loginForm.value.phoneNumber),
          formData.append('Firstname', this.loginForm.value.firstname),
          formData.append('Lastname', this.loginForm.value.lastname),
          formData.append('Status', this.loginForm.value.status),
          formData.append('NameEmpresa',this.loginForm.value.empresa),
          formData.append('Address', this.loginForm.value.address),
          formData.append('Website', this.loginForm.value.website),
          formData.append('Account', this.loginForm.value.account)
          formData.append('NameAccount', this.loginForm.value.nameaccount),
          formData.append('NameBanck', this.loginForm.value.namebanck)

        if (this.isEditMode) 
          console.log('editar');
        const idUser = this.data.payload.id;
        if (idUser > 0) {
          this.sAuth.modifyUser(formData, idUser).subscribe((data: IResult<string>) => {
            if (data.isSuccess) {
              this.sSweetAlert.closeLoading();
              this._MatDialgoRef.close(true)
            } else {
              this.sSweetAlert.showError(data.error || 'Error  al editar el categoria')
            }
          })
        }

      } else {
        if (this.isEditMode) 
        console.log('crear categoria');
        this.sAuth.register(FormData).subscribe((data: IResult<boolean>) => {
          if (data.isSuccess) {
            this.sSweetAlert.closeLoading();
            this._MatDialgoRef.close(true)
          } else {
            this.sSweetAlert.showError(data.error || "Error al crear la categoria")
          }
   })

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
