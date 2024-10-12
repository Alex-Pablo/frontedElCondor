import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TitleService } from '../../../../core/services/title.service';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'estado', 'unidad', 'compra', 'proveedor'];
  dataSource: any[] = []; // Inicializa el dataSource
  displayedColumnsProductos: string[] = ['id', 'img', 'nombre', 'categoria', 'estado', 'unidad', 'compra', 'proveedor'];
  dataSourceProductos: any[] = []; // Inicializa el dataSource para productos

  constructor(private sTitle: TitleService, private router: Router) { // Inicializa Router aquí
    this.sTitle.setTitle('Dashboard');
  }

  ngOnInit(): void {
    this.getAllProveedores();
    this.getAllCatalogo(); // Llama al método para obtener productos
  }

  getAllProveedores() {
    this.dataSource = [
      { id: 1, nombre: 'Ferretería El Tornillo', categoria: 'Ferretería', estado: 'Activo', unidad: 50, compra: 100, proveedor: 'Proveedor A' },
      { id: 2, nombre: 'Materiales y Más', categoria: 'Construcción', estado: 'Inactivo', unidad: 30, compra: 200, proveedor: 'Proveedor B' },
      { id: 3, nombre: 'Construrama', categoria: 'Materiales', estado: 'Activo', unidad: 20, compra: 150, proveedor: 'Proveedor C' },
      { id: 4, nombre: 'Ferretería San José', categoria: 'Herramientas', estado: 'Activo', unidad: 40, compra: 300, proveedor: 'Proveedor D' }
    ];
  }

  getAllCatalogo() {
    this.dataSourceProductos = [
      {
        id: 1,
        img: 'assets/img/product1.jpg',
        nombre: 'Martillo',
        categoria: 'Herramientas',
        estado: 'Activo',
        unidad: 'Piezas',
        compra: '$5.00',
        proveedor: 'Proveedor ABC'
      },
      {
        id: 2,
        img: 'assets/img/product2.jpg',
        nombre: 'Tornillo de acero',
        categoria: 'Materiales',
        estado: 'Fuera de Stock',
        unidad: 'Cajas',
        compra: '$0.10',
        proveedor: 'Proveedor XYZ'
      }
    ];
  }

  navigateToProduct() {
    // Asegúrate de que la ruta sea correcta según tu configuración de enrutamiento
    this.router.navigate(['catalogo/pages/product']); 
}

}


// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';
// import { TitleService } from '../../../../core/services/title.service';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [MatIconModule, MatTableModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   displayedColumns: string[] = ['id', 'nombre', 'categoria', 'estado', 'unidad', 'compra', 'proveedor'];
//   dataSource: any[] = []; // Inicializa el dataSource

//   constructor(private sTitle: TitleService) {
//     this.sTitle.setTitle('Dashboard');
//   }

//   ngOnInit(): void {
//     this.getAllProveedores();
//   }

//   getAllProveedores() {
//     this.dataSource = [
//       { id: 1, nombre: 'Ferretería El Tornillo', categoria: 'Ferretería', estado: 'Activo', unidad: 50, compra: 100, proveedor: 'Proveedor A' },
//       { id: 2,  nombre: 'Materiales y Más', categoria: 'Construcción', estado: 'Inactivo', unidad: 30, compra: 200, proveedor: 'Proveedor B' },
//       { id: 3,  nombre: 'Construrama', categoria: 'Materiales', estado: 'Activo', unidad: 20, compra: 150, proveedor: 'Proveedor C' },
//       { id: 4,  nombre: 'Ferretería San José', categoria: 'Herramientas', estado: 'Activo', unidad: 40, compra: 300, proveedor: 'Proveedor D' }
//     ];
//   }
// }
