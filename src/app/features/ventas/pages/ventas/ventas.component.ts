import { Component } from '@angular/core';
import { TitleService } from '../../../../core/services/title.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí


interface Producto {
  nombre: string;
  precio: number;
  codigo: string;
  disponible: number;
  imagen: string; 
  cantidad: number; // Agregado para manejar la cantidad
  descuento: number; // Agregado para manejar el descuento
}


@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule,InputSearchComponent,FormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {
  searchMessage = "Buscar Producto";
  searchInput: string | null = null;
  isModalVisible = false; // Controla la visibilidad del modal

  productos: Producto[] = [
    {
      nombre: 'Cuchara para albañil',
      precio: 23,
      codigo: '#323435',
      disponible: 34,
      imagen: 'img/Cuchara.jpg',
      cantidad: 1, 
      descuento: 0 
    },
   
    {
      nombre: 'Cerrucho',
      precio: 45,
      codigo: '#323436',
      disponible: 12,
      imagen: 'img/cerrucho.jfif',
      cantidad: 1, 
      descuento: 0  
    },
    {
      nombre: 'Cuchara',
      precio: 45,
      codigo: '#323436',
      disponible: 12,
      imagen: 'img/Cuchara.jpg',
      cantidad: 1, 
      descuento: 0 
    },
    {
      nombre: 'Cuter',
      precio: 45,
      codigo: '#323436',
      disponible: 12,
      imagen: 'img/cuter.jfif',
      cantidad: 1, 
      descuento: 0  
    },
    {
      nombre: 'Desarmador',
      precio: 45,
      codigo: '#323436',
      disponible: 12,
      imagen: 'img/desarmador.jfif',
      cantidad: 1, 
      descuento: 0  
    },
    {
      nombre: 'Pala',
      precio: 45,
      codigo: '#323436',
      disponible: 12,
      imagen: 'img/pala.jfif',
      cantidad: 1, 
      descuento: 0  
    },
  ];

  filteredProductos: Producto[] = this.productos;

  

  filtrarProductos() {
    // Usar el operador de coalescencia nula para asignar un valor por defecto
    const searchTerm = this.searchInput ?? '';

    if (!searchTerm) {
        this.filteredProductos = this.productos;
        return;
    }

    this.filteredProductos = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
}


  mostrarModal(producto: Producto) {
    this.isModalVisible = true;
    // Reiniciar la cantidad y descuento al abrir el modal
    producto.cantidad = 1; // Se inicializa con 1 al agregar
    producto.descuento = 0; // Reinicia el descuento
  }


  close() {
    this.isModalVisible = false;
    // Reiniciar valores de cantidad y descuento de todos los productos en el modal
    this.productos.forEach(producto => {
      producto.cantidad = 0;
      producto.descuento = 0;
    });
  }

  increaseQuantity(producto: Producto) {
    if (producto.cantidad < producto.disponible) {
      producto.cantidad++;
    }
  }

  decreaseQuantity(producto: Producto) {
    if (producto.cantidad > 0) {
      producto.cantidad--;
    }
  }


  calcularSubTotal(): number {
    return this.productos.reduce((acc, producto) => {
      return acc + (producto.precio * producto.cantidad);
    }, 0);
  }

  calcularTotal(): number {
    return this.calcularSubTotal() - this.productos.reduce((acc, producto) => acc + producto.descuento, 0);
  }


  confirmarVenta() {
    // Aquí puedes implementar la lógica para confirmar la venta
    console.log('Venta confirmada:', this.productos.filter(p => p.cantidad > 0));
    this.close(); // Cerrar modal después de confirmar
  }
  
  
}


  