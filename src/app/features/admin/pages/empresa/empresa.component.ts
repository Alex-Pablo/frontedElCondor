import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { IResult } from '../../../../shared/models/IResult';
import { ImageUploaderComponent } from '../../../../shared/components/image-uploader/image-uploader.component';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    ImageUploaderComponent,
  ]
})
export class EmpresaComponent implements OnInit {
  empresaForm: FormGroup;
  logotipoURL: string | ArrayBuffer | null = null;
  _BaseApi = inject(BaseApiService)
  imgUrl: any = null;
  fileToUpload: any;
  isEditMode: any
  _sweetAlert = inject(SweealertService)
  idEnterprise: any;
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.empresaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      profileImg: [null]
    });
  }

  ngOnInit(): void {
    this._BaseApi.getLastItem('Enterprise').subscribe((data: IResult<any>) => {
      console.log(data)
      if (data.isSuccess) {
        this.idEnterprise = data.value.id
        this.empresaForm.patchValue({
          nombre: data.value.name,
          numero: data.value.phoneNumber,
          correo: data.value.email,
          direccion: data.value.address,
        });

        this.imgUrl = data.value.logo
        console.log(this.imgUrl)
        this.isEditMode = true;
      } else {
        this.isEditMode = false
      }
    })
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileToUpload = file;
    this.empresaForm.patchValue({
      profileImg: file
    });

    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgUrl = e.target.result;
    };

    reader.readAsDataURL(this.fileToUpload);
  }
  getImgProfile() {
    return this.empresaForm.value.profileImg
  }



  onSubmit() {
    if (this.empresaForm.valid) {
      this._sweetAlert.showLoading();
      const formData = new FormData();
      formData.append('name', this.empresaForm.value.nombre);
      formData.append('phoneNumber', this.empresaForm.value.numero);
      formData.append('email', this.empresaForm.value.correo);
      formData.append('address', this.empresaForm.value.direccion);
      formData.append('logo', this.empresaForm.value.profileImg);
      if (this.isEditMode) {
        if (this.idEnterprise != null) {
          this._BaseApi.updateItem("Enterprise", formData, this.idEnterprise).subscribe((data: IResult<any>) => {
            if (data.isSuccess) {
              this._sweetAlert.showSuccess("Informacion actualizada")
            } else {
              this._sweetAlert.showError(data.error || "Error al actualizar la informacion")
            }
          })
        }
      } else {
        this._BaseApi.addItem("Enterprise", formData).subscribe((data: IResult<any>) => {
          if (data.isSuccess) {
            this._sweetAlert.showSuccess("Informacion registrada")
          } else {
            this._sweetAlert.showError(data.error || "Error al registrar la empresa")
          }
        })
      }

      // Asegúrate de verificar si la imagen existe antes de agregarla
      // if (this.empresaForm.value.profileImg) {
      //   formData.append('logo', this.empresaForm.value.profileImg);
      // }

      // Llamada al servicio que envía los datos
      // this.empresaService.createEmpresa(formData).subscribe(
      //   (response) => {
      //     this._sweetAlert.showSuccess('Empresa creada exitosamente!');
      //     // Resetea el formulario después de enviar los datos
      //     this.empresaForm.reset();
      //   },
      //   (error) => {
      //     this._sweetAlert.showError('Error al crear la empresa.');
      //     console.error(error);
      //   }
      // );
    } else {
      this._sweetAlert.showError('Por favor, completa todos los campos requeridos.');
    }
  }

  getFormControl(controlName: string): FormControl | null {
    const control = this.empresaForm.get(controlName);
    return control instanceof FormControl ? control : null;
  }

}
