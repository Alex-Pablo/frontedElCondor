import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductoPopupComponent } from '../../components/modals/producto-popup/producto-popup.component';
import { TitleService } from '../../../../core/services/title.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { MatIcon } from '@angular/material/icon'
import { SweealertService } from '../../../../core/services/sweealert.service';
import { ProductoDetailPopupComponent } from '../../components/modals/producto-detail-popup/producto-detail-popup.component';
import { IResult } from '../../../../shared/models/IResult';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

export interface Productos {
  nombre: string;
  descripcion: string;
  estado: string; // 'Activo' o 'Inactivo'
  cantidadProductos: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatIconModule, InputSearchComponent, MatDialogModule, MatSidenavModule, MatPaginatorModule, ProductoDetailPopupComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Productos>(); // Cambiar a MatTableDataSource

  sBaseApi = inject(BaseApiService);
  sTitle = inject(TitleService)
  @ViewChild('sidenav') sidenav!: MatSidenav
  _matDialog = inject(MatDialog)
  selectedId: any;
  searchMessage = "Buscar producto"
  sSweetalert = inject(SweealertService);
  aProducts: any;
  constructor() {
    this.sTitle.setTitle("Catalogo - Productos")
  }

  ngOnInit(): void {
    this.getProducts();
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
        this.getProducts();
      }
    });
  }


  onDelete(id: any) {
    this.sSweetalert.showConfirmation(`Quieres eliminar el producto: ${id}`, () => {
      this.sBaseApi.removeItem('Product', id).subscribe((data: IResult<any>) => {
        if (data.isSuccess) {
          this.sSweetalert.showSuccess('Producto eliminado');
          this.getProducts();
        } else {
          this.sSweetalert.showError(data.error || 'No se pudo eliminar el producto')
        }
      })
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
        this.getProducts();
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

  getProducts() {
    this.sBaseApi.getItems('Product').subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this.dataSource = data.value
      }
    })
  }


  displayedColumns: string[] = ['id', 'img', 'name', 'code', 'key', 'status', 'purchasePrice', 'salePrice', 'acciones'];

}
