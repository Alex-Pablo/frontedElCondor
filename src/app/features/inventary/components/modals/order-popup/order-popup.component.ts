import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BtnCloseComponent } from '../../../../../shared/components/btn-close/btn-close.component';
import { BtnAcceptComponent } from '../../../../../shared/components/btn-accept/btn-accept.component';
import { BaseApiService } from '../../../../../core/services/base-api.service';
import { IResult } from '../../../../../shared/models/IResult';
import { SweealertService } from '../../../../../core/services/sweealert.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSelectComponent } from '../../../../../shared/components/input-select/input-select.component';
import { InputFieldComponent } from '../../../../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-order-popup',
  standalone: true,
  imports: [
    MatDialogModule,
    BtnCloseComponent,
    BtnAcceptComponent,
    MatDividerModule,
    ReactiveFormsModule,
    InputSelectComponent,
    InputFieldComponent
  ],
  templateUrl: './order-popup.component.html',
  styleUrl: './order-popup.component.scss'
})
export class OrderPopupComponent implements OnInit {
  _MatDialgoRef = inject(MatDialogRef<OrderPopupComponent>)
  _sBaseApi = inject(BaseApiService);
  _sSweetalert = inject(SweealertService);
  _fb = inject(FormBuilder)
  aSuppliers: any;
  aProducts: any
  fOrder: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.buildForm(data);
  }

  ngOnInit(): void {
    this.getSuppliers();
    this.fOrder.get('selectedProductId').valueChanges.subscribe((id: any) => {
      this.onProductSelected(id);
    })
  }
  onProductSelected(id: any) {
    if (id > 0) {
      const selectedProduct = this.aProducts.find((p: any) => p.id == id);
      console.log(selectedProduct)
      if (selectedProduct) {
        this.fOrder.patchValue({
          price: selectedProduct.purchasePrice
        });
      }
    }
  }

  onSubmit() {
  }

  addSupplier(id: number) {
    this.fOrder.patchValue({
      idSupplier: id
    });
    this.getProductsBySupplier(id);
  }

  resetSupplier() {
    this.fOrder.patchValue({
      idSupplier: null,
      products: [],
      selectedProductId: null,
      price: null,
      quantity: null
    })
  }

  getSupplier() {
    const supplier = this.aSuppliers.find((s: any) => s.id == this.fOrder.get('idSupplier').value);
    return supplier.nameContact;
  }

  getProductsBySupplier(id: any) {
    this._sSweetalert.showLoading();
    this._sBaseApi.getItemBy('Product/supplier', id).subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this._sSweetalert.closeLoading();
        this.aProducts = data.value;
      }
    })

  }

  getSuppliers() {
    this._sSweetalert.showLoading();
    this._sBaseApi.getItems('Supplier').subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this.aSuppliers = data.value;
        this._sSweetalert.closeLoading();
        console.log(data.value)
      }
    })
  }

  buildForm(data: any) {
    this.fOrder = this._fb.group({
      idSupplier: [data.payload?.supplier || null, [Validators.required]],
      status: [data.payload?.status || 'P', [Validators.required]],
      products: this._fb.array([]),
      selectedProductId: [null],
      price: [null],
      quantity: [null]
    });
  }

  addProductToOrder() {
    const productsArray = this.fOrder.get('products') as FormArray;
    const productToAdd = this._fb.group({
      id: [this.fOrder.get('selectedProductId')?.value, Validators.required],
      price: [this.fOrder.get('price')?.value, Validators.required],
      quantity: [this.fOrder.get('quantity')?.value, [Validators.required, Validators.min(1)]]
    });

    productsArray.push(productToAdd);
    this.resetProductForm();
    console.log(this.fOrder.get('products').value)
  }
  resetProductForm() {
    this.fOrder.patchValue({
      selectedProductId: null,
      price: null,
      quantity: null
    });
  }

  getFormControl(controlName: string): FormControl | null {
    const control = this.fOrder.get(controlName);
    return control instanceof FormControl ? control : null;
  }
}