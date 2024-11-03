import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductoPopupComponent } from '../../components/modals/producto-popup/producto-popup.component';
import { TitleService } from '../../../../core/services/title.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DataSource } from '@angular/cdk/collections';
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
  imports: [MatTableModule, MatIcon, MatIconModule, InputSearchComponent, MatDialogModule, MatSidenavModule, ProductoDetailPopupComponent, MatPaginator, MatPaginatorModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit {
  _BaseApi = inject(BaseApiService);
  searchInput: string | null = null;
  selectedStartDate: any;
  sTitle = inject(TitleService)
  @ViewChild('sidenav') sidenav!: MatSidenav
  _matDialog = inject(MatDialog)
  dataSource = new MatTableDataSource<any>();
  selectedEndDate: any;
  searchMessage = "Buscar producto"
  sSweetalert = inject(SweealertService);
  aProducts: any;
  totalItems = 0;
  dItemDateEnd: any;
  dItemDateStart: any;
  private paginatorSubscription: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor() {
    this.sTitle.setTitle("Catalogo - Productos")
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.paginatorSubscription = this.paginator.page.subscribe(() => this.loadItems());
    this.loadItems();
    this.paginator.page.subscribe(() => this.loadItems());
    this.loadItems();
  }

  filterItems() {
    console.log(this.searchInput)
    this._BaseApi.filter('producto', this.searchInput, this.selectedStartDate, this.selectedEndDate).subscribe((data: IResult<any>) => {
      this.dataSource.data = data.value;
    })
  }

  clearFilters() {
    this.searchInput = null;
    this.selectedEndDate = null;
    this.selectedStartDate = null;
    this.paginator.pageIndex = 0;
    this.loadItems();

  }

  loadItems() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    this._BaseApi.getItemsPagination('product', pageIndex + 1, pageSize).subscribe((data: any) => {
      console.log(data.items)
      this.dataSource.data = data.items;
      console.log(this.dataSource)
      this.totalItems = data.pagination.TotalItemCount;
      this.paginator.pageIndex = data.pagination.CurrentPage - 1;
      this.paginator.length = this.totalItems;
    });
  }

  handleDateRangeChange(dateRange: { startDate: string, endDate: string }): void {
    this.dItemDateEnd = dateRange.endDate;
    this.dItemDateStart = dateRange.startDate;
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


  onViewDetails(selectedId: string) {
    console.log('id', selectedId)
    this._matDialog.open(ProductoDetailPopupComponent, {
      data: { id: selectedId },
      width: '350px',
      height: '100vh',
      maxHeight: '100vh',
      position: { right: '0' },
      panelClass: 'dialog-detail'
    });
  }


  closeSidenav() {
    this.sidenav.close();
  }

  getProducts() {
    this._BaseApi.getItems('Product').subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this.dataSource = data.value
      }
    })
  }


  displayedColumns: string[] = ['id', 'img', 'name', 'code', 'key', 'status', 'purchasePrice', 'salePrice', 'acciones'];

}
