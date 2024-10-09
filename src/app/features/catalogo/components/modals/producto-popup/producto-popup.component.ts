import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InputFieldComponent } from '../../../../../shared/components/input-field/input-field.component';
import { InputSelectComponent } from '../../../../../shared/components/input-select/input-select.component';
import { InputTextAreaComponent } from '../../../../../shared/components/input-text-area/input-text-area.component';
import { BtnAcceptComponent } from '../../../../../shared/components/btn-accept/btn-accept.component';
import { BtnCloseComponent } from '../../../../../shared/components/btn-close/btn-close.component';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { SweealertService } from '../../../../../core/services/sweealert.service';
import { ControlContainer, ControlEvent, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageUploaderComponent } from '../../../../../shared/components/image-uploader/image-uploader.component';
import { MatRadioModule } from '@angular/material/radio'
import { IResult } from '../../../../../shared/models/IResult';


@Component({
  selector: 'app-producto-popup',
  standalone: true,
  imports: [MatDialogModule,
    InputFieldComponent,
    InputSelectComponent,
    InputTextAreaComponent,
    BtnAcceptComponent,
    BtnCloseComponent,
    ReactiveFormsModule,
    ImageUploaderComponent,
    MatRadioModule],
  templateUrl: './producto-popup.component.html',
  styleUrl: './producto-popup.component.scss'
})



export class ProductoPopupComponent {
  private sAuth = inject(AuthService)
  private sSweetAlert = inject(SweealertService);
  _MatDialgoRef = inject(MatDialogRef<ProductoPopupComponent>)
  _fb = inject(FormBuilder)
  isEditMode: boolean;
  loginForm: any;
  imgUrl: any; //es una url que se pasa para visualiar la img,
  fileToUpload: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) {
    this.isEditMode = !!data.payload;

    this.loginForm = this._fb.group({
      profileImg: [null],
      nombre: [data.payload?.name || '', [Validators.required]],
      descripcion: [data.payload?.description || '', [Validators.required]],
      status: [data.payload?.status || 'A', [Validators.required]],
    });
    this.imgUrl = data.payload?.profile

  }

  ngOnInit(): void {
    this.getImgProfile();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.sSweetAlert.showLoading();
      const formData = new FormData();
      formData.append('nombre', this.loginForm.value.nombre),
        formData.append('descripcion', this.loginForm.value.descripcion),
        formData.append('img', this.loginForm.value.status)
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
              this.sSweetAlert.showError(data.error || 'Error  al editar el producto')
            }
          })
        }

      } else {

        console.log('crear producto');
        this.sAuth.register(formData).subscribe((data: IResult<boolean>) => {
          if (data.isSuccess) {
            this.sSweetAlert.closeLoading();
            this._MatDialgoRef.close(true)
          } else {
            this.sSweetAlert.showError(data.error || "Error al crear el producto")
          }
        })

      }
    }
  }

  getFormControl(controlName: string): FormControl | null {
    const control = this.loginForm.get(controlName);
    return control instanceof FormControl ? control : null;
  }


  onCloseModal() {
    this._MatDialgoRef.close();

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
