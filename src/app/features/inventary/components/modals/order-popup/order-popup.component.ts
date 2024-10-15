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
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

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
    InputFieldComponent,
    MatTableModule,
    MatIconModule
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
  selectedProduct: any
  editingIndex: number | null = null


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
      this.selectedProduct = this.aProducts.find((p: any) => p.id == id);
      console.log(this.selectedProduct)
      if (this.selectedProduct) {
        this.fOrder.patchValue({
          price: this.selectedProduct.purchasePrice
        });
      }
    }
  }

  editProduct(index: number) {
    const productsArray = this.fOrder.get('products') as FormArray;
    const product = productsArray.at(index).value;
    console.log(product)

    this.fOrder.patchValue({
      selectedProductId: product.productId,
      price: product.price,
      quantity: product.quantity
    });

    this.editingIndex = index;
  }


  updateProduct() {
    if (this.editingIndex !== null) {
      const productsArray = this.fOrder.get('products') as FormArray;

      productsArray.at(this.editingIndex).patchValue({
        id: this.fOrder.get('selectedProductId')?.value,
        name: this.selectedProduct?.name || '',
        price: this.fOrder.get('price')?.value,
        quantity: this.fOrder.get('quantity')?.value
      });

      this.resetProductForm();
      this.editingIndex = null;
    }
  }

  onSubmit() {
    if (this.fOrder.valid && this.fOrder.get('products')?.value.length > 0) {
      this._sSweetalert.showLoading();
      const order = {
        supplierId: this.fOrder.get('idSupplier')?.value,
        products: this.fOrder.get('products')?.value,
        status: this.fOrder.get('status')?.value
      };
      this._sBaseApi.addItem('order', order).subscribe({
        next: async (data: IResult<any>) => {
          this._sSweetalert.closeLoading();

          if (data.isSuccess) {
            const isPDFSend = await this._sSweetalert.showConfirmationPDF(`Enviar pdf al proveedor : ${this.getSupplier()}`);
            if (isPDFSend) {
              console.log('pdf enviando')
            }
            this._MatDialgoRef.close(true);
          } else {
            this._sSweetalert.showError("Error al crear el pedido");
          }
        },
        error: (error) => {
          this._sSweetalert.closeLoading();
          this._sSweetalert.showError("Ocurrió un error inesperado al crear el pedido");
          console.error('Error al crear pedido:', error);
        }
      });
    } else {
      this._sSweetalert.showError("Formulario inválido o sin productos");
    }
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
      quantity: [null, [Validators.min(1)]]
    });
  }



  addProductToOrder() {
    console.log(this.selectedProduct)
    if (this.editingIndex !== null) {
      this.updateProduct();
    } else {
      if (this.fOrder.get('quantity')?.value > 0) {

        const productsArray = this.fOrder.get('products') as FormArray;
        const productToAdd = this._fb.group({
          productId: [this.fOrder.get('selectedProductId')?.value, Validators.required],
          name: [this.selectedProduct?.name || '', Validators.required],
          price: [this.fOrder.get('price')?.value, Validators.required],
          quantity: [this.fOrder.get('quantity')?.value, [Validators.required, Validators.min(1)]]
        });

        productsArray.push(productToAdd);
        this.resetProductForm();
      }
    }
  }

  removeProduct(index: number) {
    console.log(index)
    const productsArray = this.fOrder.get('products') as FormArray;
    productsArray.removeAt(index);
  }

  resetProductForm() {
    this.fOrder.patchValue({
      selectedProductId: null,
      price: null,
      quantity: null
    });
    this.selectedProduct = null
    this.editingIndex = null
  }

  getFormControl(controlName: string): FormControl | null {
    const control = this.fOrder.get(controlName);
    return control instanceof FormControl ? control : null;
  }
  displayColumns: string[] = ['name', 'price', 'quantity', 'acciones']
}
