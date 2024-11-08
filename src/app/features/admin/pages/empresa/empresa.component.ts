import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { IResult } from '../../../../shared/models/IResult';
import { ImageUploaderComponent } from '../../../../shared/components/image-uploader/image-uploader.component';
import { SweealertService } from '../../../../core/services/sweealert.service';

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

  constructor(private fb: FormBuilder) {
    this.empresaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      profileImg: [null]
    });
    // this.imgUrl = data.payload?.profile
  }

  ngOnInit(): void {
    this._BaseApi.getLastItem('Enterprise').subscribe((data: IResult<any>) => {
      console.log(data)
      if (data.isSuccess) {
        this.empresaForm.patchValue({
          nombre: data.value.name,
          numero: data.value.phoneNumber,
          correo: data.value.email,
          direccion: data.value.address,
        });
        this.imgUrl = data.value.profile
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
      formData.append('name', this.empresaForm.value.nombre),
        formData.append('phoneNumber', this.empresaForm.value.numero),
        formData.append('email', this.empresaForm.value.correo),
        formData.append('address', this.empresaForm.value.direccion),
        formData.append('logo', this.empresaForm.value.profileImg),

      if (this.isEditMode) {

        //   this.sAuth.modifyUser(formData, idUser).subscribe((data: IResult<string>) => {
        //     if (data.isSuccess) {
        //       this.sSweetAlert.closeLoading();
        //       this._MatDialgoRef.close(true)
        //     } else {
        //       this.sSweetAlert.showError(data.error || 'Error  al editar el usuario')
        //     }
        //   })
        // }

      } else {

        // this.sAuth.register(formData).subscribe((data: IResult<boolean>) => {
        //   if (data.isSuccess) {
        //     this.sSweetAlert.closeLoading();
        //     this._MatDialgoRef.close(true)
        //   } else {
        //     this.sSweetAlert.showError(data.error || "Error al crear el usuario")
        //   }
        // })

      }
    }
  }


  getFormControl(controlName: string): FormControl | null {
    const control = this.empresaForm.get(controlName);
    return control instanceof FormControl ? control : null;
  }

}
