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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IResult } from '../../../../shared/models/IResult';
import { Component, inject, ViewChild, OnInit, ɵɵpureFunction0 } from '@angular/core';
import { IUser } from '../../../../shared/models/IUser';
import { DatePipe } from '@angular/common';

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
  imports: [
    InputSearchComponent,
    MatIcon,
    MatTableModule,
    MatSidenavModule,
    DateStartEndComponent,
    MatPaginator,
    MatPaginatorModule,
    DatePipe,
  ],
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
  _AuthS = inject(AuthService)
  _SweetAlerts = inject(SweealertService)
  totalItems = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Ventas>();
  private paginatorSubscription: any;
  displayedColumns: string[] = ['total', 'iD_User', 'saleDate', 'productsTotal', 'acciones'];
  aItemsUser: IUser[] = []
  constructor(
    private _matDialog: MatDialog,
    private authService: AuthService,
    private sTitle: TitleService
  ) {
    this.sTitle.setTitle('Ventas / Historial');
  }

  ngOnInit() {
    this._SweetAlerts.showLoading();
    this._AuthS.getUsers().subscribe((data: IResult<IUser[]>) => {
      this.aItemsUser = data.value ?? []
      this._SweetAlerts.closeLoading();
    })
  }


  ngAfterViewInit() {
    this.paginatorSubscription = this.paginator.page.subscribe(() => this.loadItems());
    this.loadItems();
    this.paginator.page.subscribe(() => this.loadItems());
    this.loadItems();
  }

  onSearch(value: string) {
    console.log(value);
  }

  onViewDetails(selectedId: string) {
    this._SweetAlerts.showLoading();
    this._BaseApi.getDetail("sale", selectedId).subscribe((date: IResult<any>) => {
      if (date.isSuccess) {
        this._SweetAlerts.closeLoading();
        this._matDialog.open(HistorialDetailPopupComponent, {
          width: '550px',
          height: '100vh',
          maxHeight: '100vh',
          position: { right: '0' },
          panelClass: 'dialog-detail',
          data: { payload: date.value }
        });
      }
    })

  }

  filterItems() {
    console.log("SearchInput: ", this.searchInput);
    this._BaseApi.filter('sale', this.searchInput, this.selectedStartDate, this.selectedEndDate)
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
    this._SweetAlerts.showLoading();
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    this._BaseApi.getItemsPagination('sale', pageIndex + 1, pageSize)
      .subscribe((data: any) => {
        this._SweetAlerts.closeLoading()
        this.dataSource.data = data.items;
        this.totalItems = data.pagination.TotalItemCount;
        this.paginator.pageIndex = data.pagination.CurrentPage - 1;
        this.paginator.length = this.totalItems
      });
  }


  getNameById(Id: number): any {
    if (this.aItemsUser.length > 0) {
      const producto = this.aItemsUser.find((p: IUser) => p.id == Id);
      return producto ? producto.username : Id;
    }
    else {
      return Id
    }
  }
}
