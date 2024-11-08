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
import { async } from 'rxjs';
import { OrderPreviewComponent } from '../../components/modals/order-preview/order-preview.component';
import { DocumentService } from '../../../../core/services/generate-order.service';
import { IInventoryReportDto } from '../../../../shared/models/IInventoryReport';
import { catchError, map } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

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
  _documentService = inject(DocumentService);
  private paginatorSubscription: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _matDialog: MatDialog,) {
  }
  searchMessage = "Buscar pedido"

  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.sTitle.setTitle("Lista de pedidos");
    // this.getOrders();
  }
  ngAfterViewInit() {
    this.paginatorSubscription = this.paginator.page.subscribe(() => this.loadItems());
    this.loadItems();
    this.paginator.page.subscribe(() => this.loadItems());
    this.loadItems();
  }

  filterItems() {
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

    this._sBaseApi.getItemsPagination('order', pageIndex + 1, pageSize).subscribe((data: any) => {
      console.log(data.items)
      this.dataSource.data = data.items.map((item: any) => ({
        id: item.id,
        priceTotal: item.priceTotal,
        productsTotal: item.productsTotal,
        status: item.status,
        supplier: item.supplier,
        supplierContact: item.supplierContact,
        timeOrder: item.timeOrder // Aquí estamos utilizando la fecha existente
      }));
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
        this.loadItems();
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
            this.loadItems();
          }
        })
      }
    })
  }
  reciveOrder(id: number) {
    this._sSweetalert.showConfirmation2(`¿Recibistes los productos realizados en el pedido: ${id}?`, 'Cancelar', 'Si, lo recibi', () => {

      this._sBaseApi.receiveItems(id).subscribe({
        next: async (data: IResult<any>) => {
          if (data.isSuccess) {
            const ok = await this._sSweetalert.showNotification("Se a actualizado el inventario con los productos recibidos");
            this.loadItems();
          } else {
            this._sSweetalert.showError("Error al editar pedido");
          }
        },
        error: (error) => {
          this._sSweetalert.closeLoading();
          this._sSweetalert.showError("Ocurrió un error al comunicarse con el servidor");
        }
      })
      // this._sBaseApi.removeItem('order', id).subscribe((data: IResult<any>) => {
      //   if (data.isSuccess) {
      //     this._sSweetalert.showSuccess('Producto agregados en el inventario');
      //     this.getOrders();
      //   } else {
      //     this._sSweetalert.showError(data.error || 'No se pudo agregar los productos')
      //   }
      // })
    });

  }

  onViewDetails(pedido: any) {
// Accede a la fecha del pedido directamente
const orderDate = pedido.timeOrder || "Fecha no válida"; // Manejo de fecha

    this._sBaseApi.getItemBy('order', pedido.id).subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        console.log("data:", data.value);
  
        const responseData = data.value;
  
        // Obtener los detalles del proveedor
        this._sBaseApi.getDetail('Supplier', responseData.supplierId).subscribe({
          next: (supplierData: IResult<any>) => {
            if (supplierData.isSuccess) {
              const supplierInfo = supplierData.value;
  
// Obtener los detalles de los productos
const productRequests = responseData.products.map((product: { id: number; productId: number; price: number; quantity: number; }) => 
  this._sBaseApi.getDetail('Product', product.productId).pipe(
    map((productData: IResult<any>) => {
      if (productData.isSuccess) {
        console.log("productData: ", productData);
        return { 
          name: productData.value.name, // Asegúrate de acceder a la propiedad correcta
          id: productData.value.id, // Asegúrate de incluir el ID también
          quantity: product.quantity, // Usa la cantidad del producto original
          price: product.price // Usa el precio del producto original
        };
      } else {
        console.log("Error al obtener los datos del producto");
        return null; // Devuelve null en caso de error
      }
    }),
    catchError(err => {
      console.error("Error en la llamada a la API para el producto con ID:", product.id, err);
      return of(null); // Devuelve un observable con valor null en caso de error
    })
  )
);
  
              // Ejecutar todas las llamadas a la API de productos en paralelo
              forkJoin(productRequests).subscribe({
                next: (productsDetails) => {
                  // Preparar los datos para la vista previa
                  const previewData = {
                    id: responseData.id,
                    supplier: supplierInfo.name,
                    supplierPhone: supplierInfo.phoneNumber,
                    orderDate: new Date(orderDate).toLocaleString()|| "Fecha no válida", // Manejo de fecha
                    products: productsDetails, // Asegúrate de incluir todos los productos
                    total: responseData.total
                  };
              
                  console.log("PreviewData:", previewData);
                  
                  // Mostrar el order Preview
                  this._matDialog.open(OrderPreviewComponent, {
                    width: '650px',
                    height: '90vh',
                    data: previewData // Pasa los datos preparados
                  }).afterClosed().subscribe((result) => {
                    if (result) {
                      this.loadItems();
                    }
                  });
                },
                error: (err) => {
                  // Agregar más información al error
                  console.error("Error en forkJoin:", err);
                  this._sSweetalert.showError("Error al obtener los datos de los productos: " + err.message);
                  this._sSweetalert.closeLoading();
                }
              });
          }},
          error: (err) => {
            this._sSweetalert.showError("Ocurrió un error al comunicarse con el servidor para obtener el proveedor");
            this._sSweetalert.closeLoading();
          }
        });
      } else {
        this._sSweetalert.showError("Ocurrió un error al obtener los datos del pedido");
        this._sSweetalert.closeLoading(); // Cerrar loading en caso de error
      }
    });
  }

  onEdit(id: any) {

  }


  onDelete(id: any) {

  }
  displayedColumns: string[] = ['id', 'supplier', 'supplierContact', 'productsTotal', 'priceTotal', 'timeOrder', 'status', 'acciones'];

}
