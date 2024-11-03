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
  isModalVisible = false;
  _BaseApi = inject(BaseApiService);
  aItemsCategory: any;
  productos: Producto[] = []
  selectedProducts: SaleDetail[] = []
  _sSweetAlet = inject(SweealertService)

  isPaymentModalVisible = false;
  montoRecibido: number = 0;
  cambio: number = 0;

  transactionId: string = ''; // Nuevo: Variable para almacenar el ID de la transacción
  transactionTotal: number = 0; 

  mostrarModalConIdYTotal(id: string, total: number) {
    this.transactionId = id;
    this.transactionTotal = total;
    this.isModalVisible = true;
  }
  calcularCambio() {
    this.cambio = this.montoRecibido - this.calcularTotal();
  }

  confirmarPago() {
    this.isPaymentModalVisible = false;
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
    const saleDetail: SaleDetail = {
        iD_product: producto.productId,
        unit_price: producto.salePrice || 0,
        discount: 0,
        quantity: 1,
        total_item: producto.salePrice || 0,
        name: this.obtenerNombreProducto(producto.id)
    };

    this.selectedProducts.push(saleDetail);
    console.log(this.selectedProducts);

    // Mostrar solo el modal de lista de productos
    this.isModalVisible = true;
    this.isPaymentModalVisible = false; // Asegúrate de que el modal de pago esté cerrado
}

  
  obtenerNombreProducto(productId: number): string {
    const producto = this.productos.find(p => p.id === productId);
    return producto ? producto.productName : 'Producto no encontrado';
  }

  calcularSubTotal(): number {
    return this.selectedProducts.reduce((sum, product) => sum + (product.unit_price * product.quantity), 0);
  }

  calcularTotal(): number {
    return this.selectedProducts.reduce((sum, product) => sum + (product.unit_price * product.quantity - product.discount), 0);
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
        console.log(data.value)
        this.close();
      } else {
        this._sSweetAlet.showError("error al registar la venta")
      }
    })
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



