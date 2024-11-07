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
import { BaseApiService } from '../../../../../core/services/base-api.service';


@Component({
  selector: 'app-categoria-popup',
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
  templateUrl: './categoria-popup.component.html',
  styleUrl: './categoria-popup.component.scss'
})

export class CategoriaPopupComponent {
  sBaseApi = inject(BaseApiService);
  private sSweetAlert = inject(SweealertService);
  _MatDialgoRef = inject(MatDialogRef<CategoriaPopupComponent>)
  _fb = inject(FormBuilder)
  isEditMode: boolean;
  loginForm: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) {
    this.isEditMode = !!data.payload;
    this.loginForm = this._fb.group({
      nombre: [data.payload?.name || '', [Validators.required]],
      descripcion: [data.payload?.description || '', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.sSweetAlert.showLoading();
      const category = {
        Name: this.loginForm.get('nombre')?.value,
        Description: this.loginForm.get('descripcion')?.value
      };
      if (this.isEditMode) {
        const idUser = this.data.payload.id;
        if (idUser > 0) {
          this.sBaseApi.updateItem('Category', category, idUser).subscribe((data: IResult<string>) => {
            if (data.isSuccess) {
              this.sSweetAlert.closeLoading();
              this._MatDialgoRef.close(true)
            } else {
              this.sSweetAlert.showError(data.error || 'Error  al editar el categoria')
            }
          })
        }
      } else {
        this.sBaseApi.addItem('Category', category).subscribe((data: IResult<boolean>) => {
          if (data.isSuccess) {
            this.sSweetAlert.closeLoading();
            this._MatDialgoRef.close(true)
          } else {
            this.sSweetAlert.showError(data.error || "Error al crear la categoria")
          }
        })
      }
    } else {
      this.sSweetAlert.showError("Campos requeridos")
    }
  }
  getFormControl(controlName: string): FormControl | null {
    const control = this.loginForm.get(controlName);
    return control instanceof FormControl ? control : null;
  }
  onCloseModal() {
    this._MatDialgoRef.close();
  }

}


