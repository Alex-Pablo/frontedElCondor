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
  private sBaseApi = inject(BaseApiService)
  private sSweetAlert = inject(SweealertService);
  _MatDialgoRef = inject(MatDialogRef<ProductoPopupComponent>)
  _fb = inject(FormBuilder)
  isEditMode: boolean;
  loginForm: any;
  imgUrl: any; //es una url que se pasa para visualiar la img,
  fileToUpload: any;
  aCategories: any
  aSuppliers: any
  aUnits: any
  aStatus: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) {
    this.isEditMode = !!data.payload;

    this.loginForm = this._fb.group({
      profileImg: [null],
      name: [data.payload?.name || '', [Validators.required]],
      code: [data.payload?.code || ''],
      key: [data.payload?.key || ''],
      description: [data.payload?.description || ''],
      purchasePrice: [data.payload?.purchasePrice || '0'],
      salePrice: [data.payload?.salePrice || '0'],
      brand: [data.payload?.brand || ''],
      idCategory: [data.payload?.id_category || '', [Validators.required]],
      idSupplier: [data.payload?.id_suplier || '', [Validators.required]],
      idUnit: [data.payload?.id_unit || '', [Validators.required]],
      stock: [data.payload?.stock || '0'],
      stockMin: [data.payload?.stockMin || '0'],
      status: [data.payload?.status || 'P', [Validators.required]],
    });
    this.imgUrl = data.payload?.img

  }

  ngOnInit(): void {
    this.getImgProfile();
    this.getCategory();
    this.getSuppliers();
    this.getunits();
    this.getStatus();


  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.sSweetAlert.showLoading();
      const formData = new FormData();
      formData.append('Name', this.loginForm.value.name)
      formData.append('Code', this.loginForm.value.code)
      formData.append('Key', this.loginForm.value.key)
      formData.append('Description', this.loginForm.value.description)
      formData.append('PurchasePrice', this.loginForm.value.purchasePrice)
      formData.append('SalePrice', this.loginForm.value.salePrice);
      formData.append('Brand', this.loginForm.value.brand);
      formData.append('Id_category', this.loginForm.value.idCategory);
      formData.append('Id_suplier', this.loginForm.value.idSupplier);
      formData.append('Id_unit', this.loginForm.value.idUnit);
      formData.append('Status', this.loginForm.value.status);
      formData.append('Stock', this.loginForm.value.stock);
      formData.append('StockMin', this.loginForm.value.stockMin);
      formData.append('Img', this.loginForm.value.profileImg);
      if (this.isEditMode) {

        const idUser = this.data.payload.id;
        if (idUser > 0) {
          this.sBaseApi.updateItem('Product', formData, idUser).subscribe((data: IResult<string>) => {
            if (data.isSuccess) {
              this.sSweetAlert.closeLoading();
              this._MatDialgoRef.close(true)
            } else {
              this.sSweetAlert.showError(data.error || 'Error  al editar el producto')
            }
          })
        }

      } else {

        this.sBaseApi.addItem('Product', formData).subscribe((data: IResult<boolean>) => {
          if (data.isSuccess) {
            this.sSweetAlert.closeLoading();
            this._MatDialgoRef.close(true)
          } else {
            this.sSweetAlert.showError(data.error || "Error al crear el producto")
          }
        })

      }
    }
    else {

    }
  }

  getCategory() {
    this.sBaseApi.getItems('Category').subscribe((data: IResult<any>) => {
      this.aCategories = data.value;
    })
  }

  getSuppliers() {
    this.sBaseApi.getItems('Supplier').subscribe((data: IResult<any>) => {
      this.aSuppliers = data.value
    })
  }

  getunits() {
    this.sBaseApi.getItems('unitOfMeasure').subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this.aUnits = data.value;
      }
    })
  }

  getStatus() {
    this.aStatus = [
      {
        id: 'S',
        name: 'Disponible (En inventario y listo para la venta)'
      },
      {
        id: 'P',
        name: 'Registrado (sin stock ni pedido)'
      }
    ]
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
