import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../../../../core/services/title.service';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { DateStartEndComponent } from '../../../../shared/components/date-start-end/date-start-end.component';
import { IResult } from '../../../../shared/models/IResult';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [InputSearchComponent,
    MatIcon,
    MatTableModule,
    MatPaginatorModule,
    DateStartEndComponent,
    DatePipe,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  sTitle = inject(TitleService)
  searchInput: string | null = null;
  selectedStartDate: any;
  selectedEndDate: any;
  searchMessage = "Buscar producto"
  sItemToSearch: any;
  dItemDateStart: any;
  dItemDateEnd: any;
  dataSource = new MatTableDataSource<any>();
  _BaseApi = inject(BaseApiService)
  totalItems = 0;
  private paginatorSubscription: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.sTitle.setTitle('Inventario')
  }

  ngAfterViewInit() {
    this.paginatorSubscription = this.paginator.page.subscribe(() => this.loadItems());
    this.loadItems();
    this.paginator.page.subscribe(() => this.loadItems());
    this.loadItems();
  }

  filterItems() {
    console.log(this.searchInput)
    this._BaseApi.filter('inventory', this.searchInput, this.selectedStartDate, this.selectedEndDate).subscribe((data: IResult<any>) => {
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

  handleDateRangeChange(dateRange: { startDate: string, endDate: string }): void {
    this.dItemDateEnd = dateRange.endDate;
    this.dItemDateStart = dateRange.startDate;
  }

  loadItems() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    this._BaseApi.getItemsPagination('inventory', pageIndex + 1, pageSize).subscribe((data: any) => {
      console.log(data.items)
      this.dataSource.data = data.items;
      console.log(this.dataSource)
      this.totalItems = data.pagination.TotalItemCount;
      this.paginator.pageIndex = data.pagination.CurrentPage - 1;
      this.paginator.length = this.totalItems;
    });
  }

  onSearch(value: string) {
    this.sItemToSearch = value;
  }

  onOpenModal() {

  }

  onEdit(id: any) {

  }
  onDelete(id: any) {

  }
  displayedColumns: string[] = [
    'id',
    'productName',
    'supplierName',
    'quantityInStock',
    'stockMin',
    'status',
    'updated_at',
    'acciones'
  ];
}
