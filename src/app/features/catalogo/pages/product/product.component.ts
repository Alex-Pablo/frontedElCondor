import { Component, inject, OnInit } from '@angular/core';
import { TitleService } from '../../../../core/services/title.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegiterCatalogoModalComponent } from '../../components/modals/regiter-catalogo-modal/regiter-catalogo-modal.component';
import { RegisterCategoriaComponent } from '../../components/modals/register-categoria/register-categoria.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatTableModule, MatIconModule, InputSearchComponent, MatDialogModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  sTitle = inject(TitleService)
  _matDialog = inject(MatDialog)

  dataSource: any;
  searchMessage = "Buscar producto"
  constructor() {
    this.sTitle.setTitle("Catalogo - Productos")
  }

  ngOnInit(): void {
    this.getAllCatalogo();
    console.log(this.dataSource);
  }
  onOpenModal() {
    this._matDialog.open(RegiterCatalogoModalComponent, {
      height: '80vh',
      width: '70vw',
      maxWidth: '70vw',
      disableClose: true,
      data: { title: 'Agregar producto' }
    }).afterClosed().subscribe(() => {
      this.getAllCatalogo();
    })
  }

  onDelete(id: any) {

  }

  onEdit(id: any) {
    this._matDialog.open(RegiterCatalogoModalComponent, {
      height: '80vh',
      maxWidth: '70vw',
      width: '70vw',
      disableClose: true,
      data: { title: 'Editar producto' }
    })
  }

  onSearch(event: any) {

  }

  getAllCatalogo() {

    this.dataSource = [
      {
        id: 1,
        img: 'assets/img/product1.jpg',
        nombre: 'Martillo',
        sku: 'SKU12345',
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
        sku: 'SKU54321',
        categoria: 'Materiales',
        estado: 'Fuera de Stock',
        unidad: 'Cajas',
        compra: '$0.10',
        proveedor: 'Proveedor XYZ'
      },
      {
        id: 2,
        img: 'assets/img/product2.jpg',
        nombre: 'Tornillo de acero',
        sku: 'SKU54321',
        categoria: 'Materiales',
        estado: 'Fuera de Stock',
        unidad: 'Cajas',
        compra: '$0.10',
        proveedor: 'Proveedor XYZ'
      },
      {
        id: 2,
        img: 'assets/img/product2.jpg',
        nombre: 'Tornillo de acero',
        sku: 'SKU54321',
        categoria: 'Materiales',
        estado: 'Fuera de Stock',
        unidad: 'Cajas',
        compra: '$0.10',
        proveedor: 'Proveedor XYZ'
      },
      {
        id: 2,
        img: 'assets/img/product2.jpg',
        nombre: 'Tornillo de acero',
        sku: 'SKU54321',
        categoria: 'Materiales',
        estado: 'Fuera de Stock',
        unidad: 'Cajas',
        compra: '$0.10',
        proveedor: 'Proveedor XYZ'
      },
      {
        id: 2,
        img: 'assets/img/product2.jpg',
        nombre: 'Tornillo de acero',
        sku: 'SKU54321',
        categoria: 'Materiales',
        estado: 'Fuera de Stock',
        unidad: 'Cajas',
        compra: '$0.10',
        proveedor: 'Proveedor XYZ'
      },
      {
        id: 2,
        img: 'assets/img/product2.jpg',
        nombre: 'Tornillo de acero',
        sku: 'SKU54321',
        categoria: 'Materiales',
        estado: 'Fuera de Stock',
        unidad: 'Cajas',
        compra: '$0.10',
        proveedor: 'Proveedor XYZ'
      },
      {
        id: 2,
        img: 'assets/img/product2.jpg',
        nombre: 'Tornillo de acero',
        sku: 'SKU54321',
        categoria: 'Materiales',
        estado: 'Fuera de Stock',
        unidad: 'Cajas',
        compra: '$0.10',
        proveedor: 'Proveedor XYZ'
      },
      {
        id: 2,
        img: 'assets/img/product2.jpg',
        nombre: 'Tornillo de acero',
        sku: 'SKU54321',
        categoria: 'Materiales',
        estado: 'Fuera de Stock',
        unidad: 'Cajas',
        compra: '$0.10',
        proveedor: 'Proveedor XYZ'
      },
      {
        id: 2,
        img: 'assets/img/product2.jpg',
        nombre: 'Tornillo de acero',
        sku: 'SKU54321',
        categoria: 'Materiales',
        estado: 'Fuera de Stock',
        unidad: 'Cajas',
        compra: '$0.10',
        proveedor: 'Proveedor XYZ'
      }
    ];
  }

  displayedColumns: string[] = ['id', 'img', 'nombre', 'categoria', 'estado', 'unidad', 'Precio Compra', 'proveedor', 'acciones'];

}
