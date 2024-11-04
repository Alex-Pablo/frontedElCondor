import { Component, inject, OnInit } from '@angular/core';
import { TitleService } from '../../../../core/services/title.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { BaseApiService } from '../../../../core/services/base-api.service';
import { IResult } from '../../../../shared/models/IResult';
import { SweealertService } from '../../../../core/services/sweealert.service';


interface Producto {
  id: number;
  productName: string;
  productId: number;
  supplierName: string | null;
  quantityInStock: number;
  stockMin: number;
  status: string;
  updated_at: string | null;
  img: string;
  code: string;
  key: string;
  salePrice: number | null;
  cantidad?: number;
  descuento?: number;
}


export interface SaleDetail {
  iD_product: number;
  unit_price: number;
  discount: number;
  quantity: number;
  total_item: number;
  name: string
}

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, InputSearchComponent, FormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {
  searchMessage = "Buscar Producto";
  searchInput: string | null = null;
  isModalVisible: boolean = false; // Controla la visibilidad del modal de pago
  _BaseApi = inject(BaseApiService);
  aItemsCategory: any;
  productos: Producto[] = []
  selectedProducts: SaleDetail[] = []
  _sSweetAlet = inject(SweealertService)

  isModalSinStockVisible: boolean = false;
  isProductListModalVisible: boolean = false; // Controla la visibilidad del modal de productos
  isPaymentModalVisible: boolean = false; // Controla la visibilidad del modal de pago

  transactionId: string | null = null; // Almacena el ID de la transacción
  transactionTotal: number | null = null; // Almacena el total de la venta

  montoRecibido: number = 0;
  cambio: number = 0;
  total = 0;
  productName: string = '';




  mostrarModalConIdYTotal(id: string, total: number) {
    this.transactionId = id;
    this.transactionTotal = total;
    this.isModalVisible = true;

  }
  calcularCambio() {
    this.cambio = this.montoRecibido - this.calcularT();
  }



  ngOnInit(): void {
    this._BaseApi.getItems('category').subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this.aItemsCategory = data.value;
      }
    })

    this.selectCategory("all")
  }

  selectCategory(id: any) {
    this._sSweetAlet.showLoading();
    this._BaseApi.getItemsById('inventory/category', id).subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this.productos = data.value
        console.log(this.productos)
        this._sSweetAlet.closeLoading();
      } else {
        this._sSweetAlet.showError("Error")
      }
    })
  }


  mostrarModal(producto: Producto) {
    // Verificar si el producto tiene existencias
    if (producto.quantityInStock <= 0) {
        // Mostrar el modal de advertencia de "Sin Stock"
        this.productName = producto.productName; // Agregar esta línea para capturar el nombre

        this.isModalSinStockVisible = true;
        return; // Salir de la función para evitar añadir el producto
    }

    const saleDetail: SaleDetail = {
      iD_product: producto.productId,
      unit_price: producto.salePrice || 0,
      discount: 0,
      quantity: 1,
      total_item: producto.salePrice || 0,
      name: this.obtenerNombreProducto(producto.id)
    };

    // Agregar el producto a la lista de productos seleccionados
    this.selectedProducts.push(saleDetail);
    console.log(this.selectedProducts);

    // Mostrar solo el modal de lista de productos
    // <<<<<<< HEAD
    //     this.isModalVisible = true
    //   }

    this.isModalVisible = true;
  }

  mostrarModalSinStock() {
    this.isModalSinStockVisible = true;
  }
  cerrarModalSinStock() {
    this.isModalSinStockVisible = false;
  }
  obtenerNombreProducto(productId: number): string {
    const producto = this.productos.find(p => p.id === productId);
    return producto ? producto.productName : 'Producto no encontrado';
  }

  calcularSubTotal(): number {
    return this.selectedProducts.reduce((sum, product) => sum + (product.unit_price * product.quantity), 0);
  }

  calcularTotal(): number {
    // Retorna directamente el total almacenado
    return this.transactionTotal || 0; // Devuelve 0 si transactionTotal es null
    // Verifica que la lista de productos seleccionados exista y esté llena
    if (this.selectedProducts && this.selectedProducts.length > 0) {
      // Calcula el total sumando los subtotales y restando descuentos
      this.total = this.selectedProducts.reduce((acc, product) => {
        const subtotalProducto = product.unit_price * product.quantity;
        const descuentoProducto = product.discount || 0;
        return acc + (subtotalProducto - descuentoProducto);
      }, 0);
    } else {
      this.total = 0; // Establece a 0 si no hay productos seleccionados
    }

    return this.total;
  }

  calcularT() {
    return this.transactionTotal ?? 0; // Si transactionTotal es null o undefined, retorna 0
  }

  close() {
    this.isModalVisible = false;
    this.selectedProducts = [];
  }



  confirmarVenta() {
    this._sSweetAlet.showLoading();
    this._BaseApi.addItem('sale', this.selectedProducts).subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this._sSweetAlet.closeLoading();
        console.log(data.value);
        this.transactionId = data.value.id;
        this.transactionTotal = data.value.total;
        this.close();
        this.isPaymentModalVisible = true;
      } else {
        this._sSweetAlet.showError("error al registrar la venta");
      }
    });
  }




  confirmar() {
    this._sSweetAlet.showLoading();
    if (this.transactionTotal !== null && this.montoRecibido > 0) {
      this.cambio = this.montoRecibido - this.transactionTotal;
      const saleTransacction = {
        amount: this.transactionTotal,
        saleId: this.transactionId,
        receiveAmount: this.montoRecibido,
        returnedAmount: this.cambio
      }
      this._BaseApi.addItem('cashFlow', saleTransacction).subscribe((data: IResult<any>) => {
        if (data.isSuccess) {
          //aqui gneera un recivbo
          //los datos que se uysar para el recibo estya en data.value
          this._sSweetAlet.showSuccess("venta realizado con exito")
        } else {
          this._sSweetAlet.showError(data.error || "Error al registrar la venta");
        }
      })

    } else {
      this._sSweetAlet.showError("Error, el total o la cantidad no son validos")
    }
    this.isPaymentModalVisible = false;
  }


  increaseQuantity(product: SaleDetail) {
    product.quantity += 1;
    product.total_item = (product.unit_price * product.quantity) - product.discount;
  }

  decreaseQuantity(product: SaleDetail) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      product.total_item = (product.unit_price * product.quantity) - product.discount;
    }
  }





  // filteredProductos: Producto[] = this.productos;



  filtrarProductos() {
  }


  // mostrarModal(producto: Producto) {
  //   this.isModalVisible = true;
  //   // Reiniciar la cantidad y descuento al abrir el modal
  //   producto.cantidad = 1; // Se inicializa con 1 al agregar
  //   producto.descuento = 0; // Reinicia el descuento
  // }


  // close() {
  //   this.isModalVisible = false;
  //   // Reiniciar valores de cantidad y descuento de todos los productos en el modal
  //   this.productos.forEach(producto => {
  //     producto.cantidad = 0;
  //     producto.descuento = 0;
  //   });
  // }

  // increaseQuantity(producto: Producto) {
  //   // if (producto.cantidad < producto.disponible) {
  //   //   producto.cantidad++;
  //   // }
  // }
  //
  // decreaseQuantity(producto: Producto) {
  //   // if (producto.cantidad > 0) {
  //   //   producto.cantidad--;
  //   // }
  // }


  // calcularSubTotal() {
  //   // return this.productos.reduce((acc, producto) => {
  //   //   return acc + (producto.precio * producto.cantidad);
  //   // }, 0);
  // }
  //
  // calcularTotal() {
  //   // return this.calcularSubTotal() - this.productos.reduce((acc, producto) => acc + producto.descuento, 0);
  // }


  // confirmarVenta() {
  //   // Aquí puedes implementar la lógica para confirmar la venta
  //   // console.log('Venta confirmada:', this.productos.filter(p => p.cantidad > 0));
  //   // this.close(); // Cerrar modal después de confirmar
  // }


}



