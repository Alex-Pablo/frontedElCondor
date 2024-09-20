import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputFieldComponent } from '../../../../../shared/components/input-field/input-field.component';
import { InputSelectComponent } from '../../../../../shared/components/input-select/input-select.component';
import { BtnCloseComponent } from '../../../../../shared/components/btn-close/btn-close.component';
import { BtnAcceptComponent } from '../../../../../shared/components/btn-accept/btn-accept.component';
import { InputTextAreaComponent } from '../../../../../shared/components/input-text-area/input-text-area.component';

@Component({
  selector: 'app-register-categoria',
  standalone: true,
  imports: [MatDialogModule, InputFieldComponent, InputSelectComponent, BtnCloseComponent, BtnAcceptComponent, InputTextAreaComponent],
  templateUrl: './register-categoria.component.html',
  styleUrl: './register-categoria.component.scss'
})
export class RegisterCategoriaComponent {

  constructor(public _matDialogRef: MatDialogRef<RegisterCategoriaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  estados = [
    {
      id: 1,
      nombre: 'Activo'
    },
    {
      id: 2,
      nombre: 'Inactivo'
    }
  ]

  onCloseModal() {
    this._matDialogRef.close();
  }

  onSubmit() {
    this._matDialogRef.close();
  }


}
