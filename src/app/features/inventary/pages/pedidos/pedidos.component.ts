import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe, NgIf } from '@angular/common';
import { TitleService } from '../../../../core/services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatedOrderComponent } from '../../components/modals/created-order/created-order.component';
import { OrderPopupComponent } from '../../components/modals/order-popup/order-popup.component';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { IResult } from '../../../../shared/models/IResult';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { DateStartEndComponent } from '../../../../shared/components/date-start-end/date-start-end.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [InputSearchComponent,
    MatIcon, MatTableModule,
    DatePipe,
    NgIf,
    OrderPopupComponent,
    DatePipe,
    DateStartEndComponent,
    MatPaginator,
    MatPaginatorModule,
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent implements OnInit {
  sTitle = inject(TitleService);
  _sBaseApi = inject(BaseApiService);
  totalItems = 0;
  _sSweetalert = inject(SweealertService)
  sItemToSearch: any;
  dItemDateStart: any;
  dItemDateEnd: any;
  selectedStartDate: any;
  selectedEndDate: any;
  searchInput: string | null = null;
  private paginatorSubscription: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _matDialog: MatDialog,) {
  }
  searchMessage = "Buscar pedido"

  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.sTitle.setTitle("Lista de pedidos");
    this.getOrders();
  }
  ngAfterViewInit() {
    this.paginatorSubscription = this.paginator.page.subscribe(() => this.loadItems());
    this.loadItems();
    this.paginator.page.subscribe(() => this.loadItems());
    this.loadItems();
  }

  filterItems() {
    console.log(this.searchInput)
    this._sBaseApi.filter('inventory', this.searchInput, this.selectedStartDate, this.selectedEndDate).subscribe((data: IResult<any>) => {
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

    this._sBaseApi.getItemsPagination('inventory', pageIndex + 1, pageSize).subscribe((data: any) => {
      console.log(data.items)
      this.dataSource.data = data.items;
      console.log(this.dataSource)
      this.totalItems = data.pagination.TotalItemCount;
      this.paginator.pageIndex = data.pagination.CurrentPage - 1;
      this.paginator.length = this.totalItems;
    });
  }

  onSearch(id: any) {
  }

  getOrders() {
    this._sSweetalert.showLoading();
    this._sBaseApi.getItems('order').subscribe((data: IResult<any>) => {
      this.dataSource = data.value;
      this._sSweetalert.closeLoading();
    })
  }

  newOrder() {
    this._matDialog.open(OrderPopupComponent, {
      height: '890vh',
      maxHeight: '90vh',
      width: '85vw',
      maxWidth: '85vw',
      disableClose: true,
      data: {}
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getOrders();
      }
    })
  }

  modifyOrder(id: number) {
    this._sBaseApi.getItemBy('order', id).subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this._matDialog.open(OrderPopupComponent, {
          height: '890vh',
          maxHeight: '90vh',
          width: '85vw',
          maxWidth: '85vw',
          disableClose: true,
          data: { payload: data.value }
        }).afterClosed().subscribe((result) => {
          if (result) {
            this.getOrders();
          }
        })
      }
    })
  }
  reciveOrder(id: number) {

    this._sSweetalert.showConfirmation2(`¿Recibistes los productos realizados en el pedido?: ${id}`, 'Cancelar', 'Ok', () => {
      this._sBaseApi.removeItem('order', id).subscribe((data: IResult<any>) => {
        if (data.isSuccess) {
          this._sSweetalert.showSuccess('Producto agregados en el inventario');
          this.getOrders();
        } else {
          this._sSweetalert.showError(data.error || 'No se pudo agregar los productos')
        }
      })
    });

  }

  onViewDetails(id: any) {

  }

  onEdit(id: any) {

  }


  onDelete(id: any) {

  }
  displayedColumns: string[] = ['id', 'supplier', 'supplierContact', 'productsTotal', 'priceTotal', 'timeOrder', 'status', 'acciones'];

}
