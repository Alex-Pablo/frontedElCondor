
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { TitleService } from '../../../../core/services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RegisterProveedorComponent } from '../../components/modals/register-proveedor/register-proveedor.component';
import { ProveedorPopupComponent } from '../../components/modals/proveedor-popup/proveedor-popup.component';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ProveedorDetailPopupComponent } from '../../components/modals/proveedor-detail-popup/proveedor-detail-popup.component';

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
  imports: [InputSearchComponent,RegisterProveedorComponent, MatIconModule, MatIcon, RegisterProveedorComponent, MatSidenavModule,ProveedorDetailPopupComponent, MatTableModule],
  templateUrl: './proveedore.component.html',
  styleUrl: './proveedore.component.scss'
})
export class ProveedoreComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'nit', 'contacto', 'correo', 'telefono', 'estado', 'acciones'];
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
    this.getAllProveedores()
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
        this.sBaseApi.removeItem('Category', id).subscribe((data: any) => {
          if (data.isSuccess) {
            // this.sSweetalert.showConfirmation('Categoria eliminada',)
          }
        })
        // this.selectedId.deleteUser(id).subscribe((data: IResult<string>) => {
        //   if (data.isSuccess) {
        //     this.sSweetalert.showSuccess('Categoria eliminada')
        //   } else {
        //     this.sSweetalert.showError("No se pudo eliminar la categoria")
        //   }
        // })
      });
    }

  onEdit(id: any) {
    this._matDialog.open(ProveedorPopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: { payload: id}
    }).afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.getAllProveedores();
      }
    })
  }

  onViewDetails(id: Proveedor) {
      this.selectedId = id;
      if (this.sidenav) {
        this.sidenav.open();
      } else {
        console.error('El sidenav no está definido.');
      }
    }


  getAllProveedores() {
    this.dataSource = [
      { nombre: 'Ferretería El Tornillo', nit: '1234567-8', contacto: 'Carlos Pérez', correo: 'carlos@eltornillo.com', telefono: '5555-1234', estado: 'Activo' },
      { nombre: 'Materiales y Más', nit: '8765432-1', contacto: 'María López', correo: 'maria@materialesymas.com', telefono: '5555-5678', estado: 'Inactivo' },
      { nombre: 'Construrama', nit: '2345678-9', contacto: 'Juan González', correo: 'juan@construrama.com', telefono: '5555-8765', estado: 'Activo' },
      { nombre: 'Ferretería San José', nit: '3456789-0', contacto: 'Ana Martínez', correo: 'ana@fersanjose.com', telefono: '5555-6543', estado: 'Inactivo' },
      { nombre: 'El Constructor', nit: '4567890-1', contacto: 'Luis Rodríguez', correo: 'luis@elconstructor.com', telefono: '5555-4321', estado: 'Activo' },
    ];
  }
}
