import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
  descuento: number;
  disponible: number;
}

@Component({
  selector: 'app-product-list-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list-detail.component.html',
  styleUrl: './product-list-detail.component.scss'
})
export class ProductListDetailComponent {
  
  productos: Producto[] = [
    { nombre: 'Pintura rojo', precio: 30, cantidad: 1, descuento: 5, disponible: 10 },
    { nombre: 'Martillo', precio: 20, cantidad: 3, descuento: 0, disponible: 15 }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductListDetailComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }

  increaseQuantity(producto: Producto) {
    if (producto.cantidad < producto.disponible) {
      producto.cantidad++;
    }
  }

  decreaseQuantity(producto: Producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  calcularSubTotal(): number {
    return this.productos.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
  }

  calcularTotal(): number {
    return this.productos.reduce((acc, prod) => acc + ((prod.precio * prod.cantidad) - prod.descuento), 0);
  }

  confirmarVenta() {
    // Lógica para confirmar la venta
    console.log('Venta confirmada', this.productos);
    this.close();
  }
}
