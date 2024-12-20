
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { TitleService } from '../../../../core/services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ProveedorPopupComponent } from '../../components/modals/proveedor-popup/proveedor-popup.component';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ProveedorDetailPopupComponent } from '../../components/modals/proveedor-detail-popup/proveedor-detail-popup.component';
import { IResult } from '../../../../shared/models/IResult';


export interface Proveedor {
  nombre: string;
  nit: string;
  contacto: string;
  correo: string;
  telefono: string;
  estado: string;
}
@Component({
  selector: 'app-proveedore',
  standalone: true,
  imports: [InputSearchComponent, MatIconModule, MatIcon, MatSidenavModule, ProveedorDetailPopupComponent, MatTableModule,],
  templateUrl: './proveedore.component.html',
  styleUrl: './proveedore.component.scss'
})
export class ProveedoreComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'nameContact', 'phoneNumber', 'status', 'acciones'];
  sTitle = inject(TitleService)
  _matDialog = inject(MatDialog)
  searchMessage = "Buscar proveedor"
  dataSource: any;
  sSweetalert = inject(SweealertService);
  sBaseApi = inject(BaseApiService);
  selectedId: any;

  @ViewChild('sidenav') sidenav!: MatSidenav
  onSearch(event: any) {
  }

  ngOnInit(): void {
    this.sTitle.setTitle("proveedores")
    this.getAllProveedores();
  }



  closeSidenav() {
    this.sidenav.close();
  }

  onOpenModal() {
    this._matDialog.open(ProveedorPopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: {}
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getAllProveedores();
      }
    });

  }

  onDelete(id: any) {
    this.sSweetalert.showConfirmation(`Quieres eliminar al proveedor: ${id}`, () => {
      this.sBaseApi.removeItem('supplier', id).subscribe((data: any) => {
        if (data.isSuccess) {
          this.sSweetalert.showSuccess('Proveedor eliminado');
          this.getAllProveedores();
        } else {
          this.sSweetalert.showError('No se pudo eliminar el proveedor')
        }
      })
    });
  }

  onEdit(supplier: any) {
    this._matDialog.open(ProveedorPopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: { payload: supplier }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getAllProveedores();
      }
    })
  }

  onViewDetails(selectedId: string) {
    this._matDialog.open(ProveedorDetailPopupComponent, {
      data: { id: selectedId },
      width: '350px',
      height: '100vh',
      maxHeight: '100vh',
      position: { right: '0' },
      panelClass: 'dialog-detail'
    });
  }

  getAllProveedores() {
    this.sBaseApi.getItems('supplier').subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this.dataSource = data.value
      }
    })
  }
}
