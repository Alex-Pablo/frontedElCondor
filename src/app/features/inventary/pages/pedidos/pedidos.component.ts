import { Component, inject, OnInit } from '@angular/core';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, NgIf } from '@angular/common';
import { TitleService } from '../../../../core/services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatedOrderComponent } from '../../components/modals/created-order/created-order.component';
import { OrderPopupComponent } from '../../components/modals/order-popup/order-popup.component';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { IResult } from '../../../../shared/models/IResult';
import { SweealertService } from '../../../../core/services/sweealert.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [InputSearchComponent, MatIcon, MatTableModule, DatePipe, NgIf, OrderPopupComponent, DatePipe],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent implements OnInit {
  sTitle = inject(TitleService);
  _sBaseApi = inject(BaseApiService);
  _sSweetalert = inject(SweealertService)
  constructor(private _matDialog: MatDialog,) {
  }
  searchMessage = "Buscar pedido"
  dataSource: any;


  ngOnInit(): void {
    this.sTitle.setTitle("Lista de pedidos");
    this.getOrders();
  }
  onSearch(id: any) {
  }

  getOrders() {
    this._sSweetalert.showLoading();
    this._sBaseApi.getItems('order').subscribe((data: IResult<any>) => {
      console.log('data', data)
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

  onViewDetails(id: any) {

  }

  onEdit(id: any) {

  }


  onDelete(id: any) {

  }
  displayedColumns: string[] = ['id', 'supplier', 'supplierContact', 'productsTotal', 'priceTotal', 'timeOrder', 'status', 'acciones'];

}
