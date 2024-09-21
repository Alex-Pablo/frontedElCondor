import { Component, Inject } from '@angular/core';
import { InputFieldComponent } from '../../../../../shared/components/input-field/input-field.component';
import { BtnAcceptComponent } from '../../../../../shared/components/btn-accept/btn-accept.component';
import { BtnCloseComponent } from '../../../../../shared/components/btn-close/btn-close.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputSelectComponent } from '../../../../../shared/components/input-select/input-select.component';

@Component({
  selector: 'app-register-proveedor',
  standalone: true,
  imports: [InputFieldComponent, BtnCloseComponent, MatDialogModule, BtnAcceptComponent, InputSelectComponent],
  templateUrl: './register-proveedor.component.html',
  styleUrl: './register-proveedor.component.scss'
})
export class RegisterProveedorComponent {

  constructor(private _matDialogRef: MatDialogRef<RegisterProveedorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }



  onCloseModal() {
    this._matDialogRef.close();
  }

  onSubmit() {
    this._matDialogRef.close();
  }

  categorias = [
    { id: 1, nombre: 'Activo' },
    { id: 2, nombre: 'Inactivo' },]
}
