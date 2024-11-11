import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { BtnCloseComponent } from '../../../../../shared/components/btn-close/btn-close.component';
import { BtnAcceptComponent } from '../../../../../shared/components/btn-accept/btn-accept.component';
import { BaseApiService } from '../../../../../core/services/base-api.service';
import { IResult } from '../../../../../shared/models/IResult';
import { SweealertService } from '../../../../../core/services/sweealert.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSelectComponent } from '../../../../../shared/components/input-select/input-select.component';
import { InputFieldComponent } from '../../../../../shared/components/input-field/input-field.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DocumentService } from '../../../../../core/services/generate-order.service';
import { OrderPreviewComponent } from '../order-preview/order-preview.component'
import { firstValueFrom } from 'rxjs';

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
    MatIconModule,
  ],
  templateUrl: './order-popup.component.html',
  styleUrl: './order-popup.component.scss'
})
export class OrderPopupComponent implements OnInit {
  _MatDialgoRef = inject(MatDialogRef<OrderPopupComponent>)
  _sBaseApi = inject(BaseApiService);
  _sSweetalert = inject(SweealertService);
  _documentService = inject(DocumentService);
  _fb = inject(FormBuilder)
  aSuppliers: any;
  aProducts: any
  aStatus: any;
  fOrder: FormGroup = this._fb.group({});
  selectedProduct: any
  editingIndex: number | null = null
  isEditMode: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    this.isEditMode = !!data.payload;
    this.buildForm(this.data);
  }

  ngOnInit(): void {
    this.getSuppliers();
    this.fOrder.get('selectedProductId')?.valueChanges.subscribe((id: any) => {
      this.onProductSelected(id);
    })
    this.fOrder.get('status')?.valueChanges.subscribe(async (id: string) => {
      if (id === 'E') {
        const ok = await this._sSweetalert.showNotification(
          `Una vez cambiando el estado a en proceso ya no se podrá modificar el pedido.\n ¿Ya notificaste el pedido al proveedor?`
        );
      }
    });

    if (this.data?.payload?.supplierId) {
      this.getProductsBySupplier(this.data?.payload?.supplierId)
    }
    this.getStatus()
  }
  onProductSelected(id: any) {
    if (id > 0) {
      this.selectedProduct = this.aProducts.find((p: any) => p.id == id);
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
        productId: this.fOrder.get('selectedProductId')?.value,
        name: this.selectedProduct?.name || '',
        price: this.fOrder.get('price')?.value,
        quantity: this.fOrder.get('quantity')?.value
      });

      this.resetProductForm();
      this.editingIndex = null;
    }
  }

  onSubmit() {
    // Validar que el formulario es válido y que hay productos
    if (this.fOrder.valid && this.fOrder.get('products')?.value.length > 0) {
      this._sSweetalert.showLoading();

      // Extraer productos del formulario
      const products = this.fOrder.get('products')?.value;

      const order = {
        supplierId: this.fOrder.get('idSupplier')?.value,
        products: this.fOrder.get('products')?.value,
        status: this.fOrder.get('status')?.value
      };

      if (!this.isEditMode) {

        // Enviar el nuevo pedido al servidor
        this._sBaseApi.addItem('order', order).subscribe({
          next: async (data: IResult<any>) => {
            if (data.isSuccess) {
              // Extraer y preparar los datos para la vista previa
              const responseData = data.value;

              // Obtener los detalles del proveedor
              this._sBaseApi.getDetail('Supplier', responseData.supplierId).subscribe({
                next: (supplierData: IResult<any>) => {
                  if (supplierData.isSuccess) {
                    const supplierInfo = supplierData.value;

                    console.log("datos proveedor: ", supplierInfo)

                    // Preparar los datos para la vista previa
                    const previewData = {
                      id: responseData.id,
                      supplier: supplierInfo.name,
                      supplierPhone: supplierInfo.phoneNumber,
                      orderDate: new Date(responseData.orderDate).toLocaleString(),
                      products: order.products,
                      total: responseData.total
                    };

                    // Mostrar la vista previa del PDF
                    const dialogRef = this.dialog.open(OrderPreviewComponent, {
                      width: '650px', // Ancho del diálogo
                      height: '90vh', // Alto del diálogo
                      data: previewData
                    });

                    // Cerrar el loading después de abrir el diálogo
                    this._sSweetalert.closeLoading();

                    // Manejar el cierre del diálogo
                    firstValueFrom(dialogRef.afterClosed()).then(async (confirmed) => {
                      if (confirmed) {
                        await this._sSweetalert.showNotification("El PDF se ha descargado. Envía al proveedor y cambia el estado a 'En proceso'.");
                        this._MatDialgoRef.close(true);
                      } else {
                        console.log("El pedido fue cancelado.");
                      }
                    });
                  } else {
                    this._sSweetalert.showError("Error al obtener los datos del proveedor");
                    this._sSweetalert.closeLoading();
                  }
                },
                error: (err) => {
                  this._sSweetalert.showError("Ocurrió un error al comunicarse con el servidor para obtener el proveedor");
                  this._sSweetalert.closeLoading();
                }
              });
            } else {
              this._sSweetalert.showError("Error al crear el pedido");
              this._sSweetalert.closeLoading(); // Cerrar loading en caso de error
            }
          },
          error: (err) => {
            this._sSweetalert.showError("Ocurrió un error al comunicarse con el servidor");
            this._sSweetalert.closeLoading(); // Cerrar loading en caso de error
          }
        });
      } else {
        this._sBaseApi.updateItem('order', order, this.data.payload.id).subscribe((data: IResult<any>) => {
          if (data.isSuccess) {
            this._sSweetalert.showSuccess("Pedido actualizado")
            this._MatDialgoRef.close(true);
          } else {
            this._sSweetalert.showError(data.error || "Error al actualizar el pedido")
          }
        })
      }
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
    const suppliers = this.aSuppliers ?? [];
    const supplier = suppliers.find((s: any) => s.id == this.fOrder.get('idSupplier')?.value);
    return supplier ? supplier.nameContact : 'No proveedor';
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
      }
    })
  }



  buildForm(data: any) {
    this.fOrder = this._fb.group({
      idSupplier: [data?.payload?.supplierId || null, [Validators.required]],
      status: [data?.payload?.status || 'P', [Validators.required]],
      products: this._fb.array(
        data?.payload?.products?.map((product: any) => {
          const productDetails = this.aProducts?.find((p: any) => p.id == product.productId);
          return this._fb.group({
            id: [product.id],
            productId: [product.productId, [Validators.required]],
            price: [product.price, [Validators.required, Validators.min(0)]],
            quantity: [product.quantity, [Validators.required, Validators.min(1)]],
            name: [productDetails ? productDetails.name : 'producto']
          });
        }) || []
      ),
      selectedProductId: [null],
      price: [null],
      quantity: [null, [Validators.min(1)]]
    });
  }

  addProductToOrder() {
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


  getStatus() {
    this.aStatus = [
      {
        id: 'P',
        name: 'Pendiente (Aun no se ha notificado al proveedor)'
      },
      {
        id: 'E',
        name: 'En proceso (Se ha notificado al proveedor)'
      }
    ]
  }

}
