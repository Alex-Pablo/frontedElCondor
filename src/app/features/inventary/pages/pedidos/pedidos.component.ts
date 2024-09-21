import { Component, inject, OnInit } from '@angular/core';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, NgIf } from '@angular/common';
import { TitleService } from '../../../../core/services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatedOrderComponent } from '../../components/modals/created-order/created-order.component';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [InputSearchComponent, MatIcon, MatTableModule, DatePipe, NgIf, CreatedOrderComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent implements OnInit {
  sTitle = inject(TitleService);

  constructor(private _matDialog: MatDialog,) {
  }
  searchMessage = "Buscar pedido"
  dataSource: any;


  ngOnInit(): void {
    this.sTitle.setTitle("Lista de pedidos");
    this.dataSource = [
      { numeroPedido: 1, proveedor: 'Ferretería S.A.', total: 500, estado: 'Pendiente', fechaCreacion: '2023-09-15' },
      { numeroPedido: 2, proveedor: 'Materiales XYZ', total: 1500, estado: 'Completado', fechaCreacion: '2023-09-16' },
      { numeroPedido: 3, proveedor: 'Construcciones ABC', total: 1200, estado: 'En Proceso', fechaCreacion: '2023-09-17' },
      { numeroPedido: 4, proveedor: 'Ferretería S.A.', total: 500, estado: 'Pendiente', fechaCreacion: '2023-09-15' },
      { numeroPedido: 5, proveedor: 'Materiales XYZ', total: 1500, estado: 'Completado', fechaCreacion: '2023-09-16' },
      { numeroPedido: 6, proveedor: 'Construcciones ABC', total: 1200, estado: 'En Proceso', fechaCreacion: '2023-09-17' }
    ];
  }
  onSearch(id: any) {

  }

  onOpenModal() {
    this._matDialog.open(CreatedOrderComponent, {
      height: '80vh',
      width: '70vw',
      maxWidth: '70vw',
      disableClose: true
    })
  }

  onViewDetails(id: any) {

  }

  onEdit(id: any) {

  }


  onDelete(id: any) {

  }
  displayedColumns: string[] = ['numeroPedido', 'proveedor', 'total', 'estado', 'fechaCreacion', 'acciones'];

}
