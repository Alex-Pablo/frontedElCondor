import { Component } from '@angular/core';
import { TitleService } from '../../../../core/services/title.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ProductListDetailComponent } from '../../components/modals/product-list-detail/product-list-detail.component';


interface Producto {
  nombre: string;
  precio: number;
  codigo: string;
  disponible: number;
  imagen: string;
}


@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {
  constructor(private _matDialog: MatDialog, private authService: AuthService, private sTitle: TitleService) {
    this.sTitle.setTitle('ventas');
  }

  productos: Producto[] = [
    {
      nombre: 'Cuchara para albañil',
      precio: 23,
      codigo: '#323435',
      disponible: 34,
      imagen: 'img/Cuchara.jpg'
    },

    {
      nombre: 'Cerrucho',
      precio: 45,
      codigo: '#323436',
      disponible: 12,
      imagen: 'img/cerrucho.jfif'
    },
    {
      nombre: 'Cuchara',
      precio: 45,
      codigo: '#323436',
      disponible: 12,
      imagen: 'img/Cuchara.jpg'
    },
    {
      nombre: 'Cuter',
      precio: 45,
      codigo: '#323436',
      disponible: 12,
      imagen: 'img/cuter.jfif'
    },
    {
      nombre: 'Desarmador',
      precio: 45,
      codigo: '#323436',
      disponible: 12,
      imagen: 'img/desarmador.jfif'
    },
    {
      nombre: 'Pala',
      precio: 45,
      codigo: '#323436',
      disponible: 12,
      imagen: 'img/pala.jfif'
    },
  ];

  agregarProducto(producto: Producto) {
    const dialogRef = this._matDialog.open(ProductListDetailComponent, {
      data: producto // Puedes pasar el producto al modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes manejar el resultado si es necesario
      console.log('El modal fue cerrado con el resultado:', result);
    });
  }


}
