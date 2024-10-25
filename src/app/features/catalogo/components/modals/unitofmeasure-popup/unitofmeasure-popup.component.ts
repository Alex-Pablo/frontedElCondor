import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InputFieldComponent } from '../../../../../shared/components/input-field/input-field.component';
import { InputTextAreaComponent } from '../../../../../shared/components/input-text-area/input-text-area.component';
import { BtnAcceptComponent } from '../../../../../shared/components/btn-accept/btn-accept.component';
import { BtnCloseComponent } from '../../../../../shared/components/btn-close/btn-close.component';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweealertService } from '../../../../../core/services/sweealert.service';
import { IResult } from '../../../../../shared/models/IResult';
import { BaseApiService } from '../../../../../core/services/base-api.service';

export interface UnitOfMeasure {
  id: number; 
  name: string;
  abbreviation: string;
  description: string;
}

@Component({
  selector: 'app-unitofmeasure-popup',
  standalone: true,
  imports: [
    MatDialogModule,
    InputFieldComponent,
    InputTextAreaComponent,
    BtnAcceptComponent,
    BtnCloseComponent,
    ReactiveFormsModule
  ],
  templateUrl: './unitofmeasure-popup.component.html',
  styleUrls: ['./unitofmeasure-popup.component.scss']
})
export class UnitofmeasurePopupComponent {
  sBaseApi = inject(BaseApiService);
  private sSweetAlert = inject(SweealertService);
  _MatDialgoRef = inject(MatDialogRef<UnitofmeasurePopupComponent>);
  _fb = inject(FormBuilder);
  isEditMode: boolean;
  unitForm: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.isEditMode = !!data.payload;
    this.unitForm = this._fb.group({
      name: [data.payload?.name || '', [Validators.required]],
      abbreviation: [data.payload?.abbreviation || '', [Validators.required]],
      description: [data.payload?.description || '', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.unitForm.valid) {
      this.sSweetAlert.showLoading();
      
      // Cambiar las propiedades a minúsculas para coincidir con la API
      const unit = {
        name: this.unitForm.get('name')?.value,  // Cambiado a minúscula
        abbreviation: this.unitForm.get('abbreviation')?.value,  // Cambiado a minúscula
        description: this.unitForm.get('description')?.value  // Cambiado a minúscula
      };
  
      
        console.log('enviando')
        this.sBaseApi.addItem('unitOfMeasure', unit).subscribe(

          (data: IResult<boolean>) => {
            console.log('enviando2')
            this.sSweetAlert.closeLoading(); // Cierra el loading
  
            if (data.isSuccess) {
              this._MatDialgoRef.close(true); // Cierra el diálogo si es exitoso
            } else {
              this.sSweetAlert.showError(data.error || 'Error al crear la unidad de medida');
            }
          },
          (error) => {
            this.sSweetAlert.closeLoading(); // Cierra el loading en caso de error
            console.error('Error al crear:', error); // Registro del error en la consola
            this.sSweetAlert.showError('Error al crear la unidad de medida: ' + error.message);
          }
        );
      }
    else {
      this.sSweetAlert.showError('Por favor, completa todos los campos requeridos.'); // Mensaje si el formulario no es válido
    }
  }
  

  // onSubmit() {
  //   if (this.unitForm.valid) {
  //     this.sSweetAlert.showLoading();
  //     const unit = {
  //       Name: this.unitForm.get('name')?.value,
  //       Abbreviation: this.unitForm.get('abbreviation')?.value,
  //       Description: this.unitForm.get('description')?.value
  //     };
  //     if (this.isEditMode) {
  //       const idUnit = this.data.payload.id;
  //       if (idUnit > 0) {
  //         this.sBaseApi.updateItem('unitOfMeasure', unit, idUnit).subscribe((data: IResult<string>) => {
  //           if (data.isSuccess) {
  //             this.sSweetAlert.closeLoading();
  //             this._MatDialgoRef.close(true);
  //           } else {
  //             this.sSweetAlert.showError(data.error || 'Error al editar la unidad de medida');
  //           }
  //         });
  //       }
  //     } else {
  //       this.sBaseApi.addItem('unitOfMeasure', unit).subscribe((data: IResult<boolean>) => {
  //         if (data.isSuccess) {
  //           this.sSweetAlert.closeLoading();
  //           this._MatDialgoRef.close(true);
  //         } else {
  //           this.sSweetAlert.showError(data.error || 'Error al crear la unidad de medida');
  //         }
  //       });
  //     }
  //   }
  // }

  getFormControl(controlName: string): FormControl | null {
    const control = this.unitForm.get(controlName);
    return control instanceof FormControl ? control : null;
  }

  onCloseModal() {
    this._MatDialgoRef.close();
  }
}




// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-unitofmeasure-popup',
//   standalone: true,
//   imports: [],
//   templateUrl: './unitofmeasure-popup.component.html',
//   styleUrl: './unitofmeasure-popup.component.scss'
// })
// export class UnitofmeasurePopupComponent {

// }
