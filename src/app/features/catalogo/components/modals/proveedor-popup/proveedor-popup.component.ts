import { Component, Inject, inject } from '@angular/core';
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
import { BaseApiService } from '../../../../../core/services/base-api.service';

@Component({
  selector: 'app-proveedor-popup',
  standalone: true,
  imports: [InputFieldComponent, InputSelectComponent, BtnCloseComponent, BtnAcceptComponent, MatRadioModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './proveedor-popup.component.html',
  styleUrl: './proveedor-popup.component.scss'
})
export class ProveedorPopupComponent {
  sBaseApi = inject(BaseApiService)
  private sSweetAlert = inject(SweealertService);
  _MatDialgoRef = inject(MatDialogRef<ProveedorPopupComponent>)
  _fb = inject(FormBuilder)
  isEditMode: boolean;
  loginForm: any;
  roles!: IRole[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) {
    this.isEditMode = !!data.payload;

    this.loginForm = this._fb.group({
      name: [data.payload?.name || '', [Validators.required]],
      nameContact: [data.payload?.nameContact || '', [Validators.required]],
      phoneNumberContact: [data.payload?.phoneNumber || '', [Validators.required]],
      phoneNumberSupplier: [data.payload?.phoneNumberSupplier || ''],
      email: [data.payload?.email || '',],
      address: [data.payload?.address || '', [Validators.required]],
      website: [data.payload?.website || ''],
      account: [data.payload?.numberAccount || ''],
      nameAccount: [data.payload?.nameAccount || ''],
      nameBanck: [data.payload?.nameBanck || ''],
      comment: [data.payload?.comment || ''],
      status: [data.payload?.status || 'A', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.sSweetAlert.showLoading();

      const supplier = {
        Name: this.loginForm.get('name')?.value,
        NameContact: this.loginForm.get('nameContact')?.value,
        PhoneNumber: this.loginForm.get('phoneNumberContact')?.value,
        PhoneNumberSupplier: this.loginForm.get('phoneNumberSupplier')?.value,
        Email: this.loginForm.get('email')?.value,
        Address: this.loginForm.get('address')?.value,
        Website: this.loginForm.get('website')?.value,
        NumberAccount: this.loginForm.get('account')?.value,
        NameAccount: this.loginForm.get('nameAccount')?.value,
        NameBanck: this.loginForm.get('nameBanck')?.value,
        Comment: this.loginForm.get('comment')?.value,
        Status: this.loginForm.get('status')?.value,
      }

      if (this.isEditMode) {
        const idSupplier = this.data.payload.id;
        if (idSupplier > 0) {
          this.sBaseApi.updateItem('supplier', supplier, idSupplier).subscribe((data: IResult<string>) => {
            if (data.isSuccess) {
              this.sSweetAlert.showSuccess('Proveedor modificado')
              this._MatDialgoRef.close(true)
            } else {
              this.sSweetAlert.showError(data.error || 'Error  al editar  el proveedor')
            }
          })
        }
      }
      else {
        this.sBaseApi.addItem('supplier', supplier).subscribe((data: IResult<boolean>) => {
          if (data.isSuccess) {
            this.sSweetAlert.showSuccess('Proveedor creado')
            this._MatDialgoRef.close(true)
          } else {
            this.sSweetAlert.showError(data.error || "Error al crear el proveedor")
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

}
