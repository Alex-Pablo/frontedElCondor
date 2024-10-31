import { TitleService } from '../../../../core/services/title.service';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { MatIcon } from '@angular/material/icon';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HistorialDetailPopupComponent } from '../../components/historial-detail-popup/historial-detail-popup.component';
import { DateStartEndComponent } from "../../../../shared/components/date-start-end/date-start-end.component";
import { MatPaginator } from '@angular/material/paginator';
import { IResult } from '../../../../shared/models/IResult';
import { Component, inject, ViewChild, OnInit } from '@angular/core';

interface Ventas {
  id: string;
  date: string;
  user: string;
  totalventa: number;
  cantprod: number;
}

@Component({
  selector: 'app-historial-ventas',
  standalone: true,
  imports: [InputSearchComponent, MatIcon, MatTableModule, MatSidenavModule, DateStartEndComponent],
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.scss']
})
export class HistorialVentasComponent implements OnInit {
  // Declaración de propiedades
  searchMessage = "Buscar ventas";
  searchInput: string | null = null;
  selectedStartDate: any;
  selectedEndDate: any;
  _BaseApi = inject(BaseApiService);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Ventas>();

  ventas: Ventas[] = [
    {
      id: '001',
      date: '12/08/2024',
      user: 'Alex Pablo',
      totalventa: 23,
      cantprod: 1
    },
    {
      id: '002',
      date: '12/08/2025',
      user: 'Royer Alexander',
      totalventa: 45,
      cantprod: 1
    },
  ];

  displayedColumns: string[] = ['id', 'date', 'user', 'totalventa', 'cantprod', 'acciones'];

  constructor(
    private _matDialog: MatDialog,
    private authService: AuthService,
    private sTitle: TitleService
  ) {
    this.sTitle.setTitle('Ventas / Historial');
  }

  ngOnInit() {
    // Asigna el arreglo ventas al dataSource
    this.dataSource.data = this.ventas;
  }

  onSearch(value: string) {
    console.log(value);
  }

  onViewDetails(selectedId: string) {
    const selectedData = this.dataSource.data.find(item => item.id === selectedId);
    
    if (selectedData) {
      this._matDialog.open(HistorialDetailPopupComponent, {
        data: selectedData,
        width: '450px',
        height: '100vh',
        maxHeight: '100vh',
        position: { right: '0' },
        panelClass: 'dialog-detail'
      });
    }
  }
  
  filterItems() {
    console.log(this.searchInput);
    this._BaseApi.filter('inventory', this.searchInput, this.selectedStartDate, this.selectedEndDate)
      .subscribe((data: IResult<any>) => {
        this.dataSource.data = data.value;
      });
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
  
    this._BaseApi.getItemsPagination('inventory', pageIndex + 1, pageSize)
      .subscribe((data: any) => {
        console.log(data.items);
        this.dataSource.data = data.items;
        console.log(this.dataSource);
        this.paginator.pageIndex = data.pagination.CurrentPage - 1;
      });
  }
}