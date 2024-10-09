import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductoPopupComponent } from '../../components/modals/producto-popup/producto-popup.component';
import { TitleService } from '../../../../core/services/title.service';
import { MatTableModule } from '@angular/material/table';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { MatIcon } from '@angular/material/icon'
import { SweealertService } from '../../../../core/services/sweealert.service';
import { RegiterCatalogoModalComponent } from '../../components/modals/regiter-catalogo-modal/regiter-catalogo-modal.component';
import { RegisterCategoriaComponent } from '../../components/modals/register-categoria/register-categoria.component';
import { ProductoDetailPopupComponent } from '../../components/modals/producto-detail-popup/producto-detail-popup.component';

export interface Productos {
  nombre: string;
  descripcion: string;
  estado: string; // 'Activo' o 'Inactivo'
  cantidadProductos: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatIconModule, RegiterCatalogoModalComponent, InputSearchComponent, MatDialogModule, MatSidenavModule, ProductoDetailPopupComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit {
  sBaseApi = inject(BaseApiService);
  sTitle = inject(TitleService)
  @ViewChild('sidenav') sidenav!: MatSidenav
  _matDialog = inject(MatDialog)
  selectedId: any;
  dataSource: any;
  searchMessage = "Buscar producto"
  sSweetalert = inject(SweealertService);

  constructor() {
    this.sTitle.setTitle("Catalogo - Productos")
  }

  ngOnInit(): void {
    this.getAllCatalogo();
    console.log(this.dataSource);
  }



  onOpenModal() {
    this._matDialog.open(ProductoPopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: {}
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getAllCategoria();
      }
    });
  }


  onDelete(id: any) {
    this.sSweetalert.showConfirmation(`Quieres eliminar el producto: ${id}`, () => {
      this.sBaseApi.removeItem('Category', id).subscribe((data: any) => {
        if (data.isSuccess) {
          // this.sSweetalert.showConfirmation('Categoria eliminada',)
        }
      })
      // this.selectedId.deleteUser(id).subscribe((data: IResult<string>) => {
      //   if (data.isSuccess) {
      //     this.sSweetalert.showSuccess('Categoria eliminada')
      //   } else {
      //     this.sSweetalert.showError("No se pudo eliminar la categoria")
      //   }
      // })
    });
  }


  onEdit(categoria: any) {
    this._matDialog.open(ProductoPopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: { payload: categoria }
    }).afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.getAllCategoria();
      }
    })
  }

  onSearch(event: any) {

  }

  onViewDetails(id: Productos) {
    this.selectedId = id;
    if (this.sidenav) {
      this.sidenav.open();
    } else {
      console.error('El sidenav no está definido.');
    }
  }

  closeSidenav() {
    this.sidenav.close();
  }

  getAllCategoria() {
    this.sBaseApi.getItems('Category').subscribe((data: any) => {
      if (data.isSuccess) {
        this.dataSource = data.value;
      }
    })
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
    ];
  }

  displayedColumns: string[] = ['id', 'img', 'nombre', 'categoria', 'estado', 'unidad', 'Precio Compra', 'proveedor', 'acciones'];

}
