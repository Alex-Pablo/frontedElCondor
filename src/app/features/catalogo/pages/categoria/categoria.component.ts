import { RegisterCategoriaComponent } from '../../components/modals/register-categoria/register-categoria.component';
import { CategoriaPopupComponent } from '../../components/modals/categoria-popup/categoria-popup.component';
import { MatListItem } from '@angular/material/list';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { AuthService } from '../../../../core/services/auth.service';
import { IResult } from '../../../../shared/models/IResult';
import { IUser } from '../../../../shared/models/IUser';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon'
import { TitleService } from '../../../../core/services/title.service';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { JWTTokenService } from '../../../../core/services/jwttoken.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { CategoriaDetailPopupComponent } from '../../components/modals/categoria-detail-popup/categoria-detail-popup.component';



export interface Categoria {
  nombre: string;
  descripcion: string;
  estado: string; // 'Activo' o 'Inactivo'
  cantidadProductos: number;
}

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [InputSearchComponent, MatIcon, RegisterCategoriaComponent, MatTableModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
  
})
export class CategoriaComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'cantidadProductos', 'acciones'];
  sTitle = inject(TitleService)
  _matDialog = inject(MatDialog)
  searchMessage = "Buscar proveedor"
  dataSource: any;
  selectedId: any;
  @ViewChild('sidenav') sidenav!: MatSidenav
  isOpen: boolean = false;
  sSweetalert = inject(SweealertService);




  ngOnInit(): void {
    this.sTitle.setTitle('Categorias de productos')
    this.getAllCategoria();
  }

  onSearch(id: any) {
    console.log(id)
  }

  onViewDetails(id: Categoria) {
    this.selectedId = id;
    if (this.sidenav) {
      this.sidenav.open();
    } else {
      console.error('El sidenav no está definido.');
    }
  }
  
  onOpenModal() {
    this._matDialog.open(CategoriaPopupComponent, {
  width:'60vw',
  maxWidth:'60vw',
  disableClose:true,
  data:{}
  }).afterClosed().subscribe((result) => {
    if (result) {
      this.getAllCategoria();
    }
  });
}


toggleDropdown(event: MouseEvent) {
  const dropdown = (event.target as HTMLElement).nextElementSibling;
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

closeModal() { this.isOpen = false };

onDelete(id: any) {
  this.sSweetalert.showConfirmation(`Quieres eliminar la categoria: ${id}}`, () => {
    this.selectedId.deleteUser(id).subscribe((data: IResult<string>) => {
      if (data.isSuccess) {
        this.sSweetalert.showSuccess('Categoria eliminada')
      } else {
        this.sSweetalert.showError("No se pudo eliminar la categoria")
      }
    })
  });
}

  onEdit(id: any) {
    this._matDialog.open(CategoriaPopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: { payload: id }
    }).afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.getAllCategoria();
      }
    })
  }


  closeSidenav() {
    this.dataSource.close();
  }


  getAllCategoria() {
    this.dataSource = [
      { nombre: 'Herramientas Manuales', descripcion: 'Incluye martillos, destornilladores y más.', estado: 'Activo', cantidadProductos: 150 },
      { nombre: 'Herramientas Eléctricas', descripcion: 'Taladros, sierras eléctricas y herramientas eléctricas.', estado: 'Activo', cantidadProductos: 80 },
      { nombre: 'Materiales de Construcción', descripcion: 'Cemento, ladrillos y otros materiales.', estado: 'Activo', cantidadProductos: 200 },
      { nombre: 'Fontanería', descripcion: 'Tuberías, grifos y accesorios de fontanería.', estado: 'Inactivo', cantidadProductos: 50 },
      { nombre: 'Electricidad', descripcion: 'Cables, enchufes y productos eléctricos.', estado: 'Activo', cantidadProductos: 120 },
      { nombre: 'Jardinería', descripcion: 'Herramientas y productos para el cuidado del jardín.', estado: 'Activo', cantidadProductos: 90 },
      { nombre: 'Seguridad', descripcion: 'Candados, alarmas y sistemas de seguridad.', estado: 'Activo', cantidadProductos: 30 },
      { nombre: 'Pintura y Acabados', descripcion: 'Pinturas, brochas y productos para acabados.', estado: 'Activo', cantidadProductos: 60 },
      { nombre: 'Accesorios para Automóviles', descripcion: 'Herramientas y productos para el mantenimiento de vehículos.', estado: 'Inactivo', cantidadProductos: 15 },
      { nombre: 'Productos de Limpieza', descripcion: 'Productos químicos y herramientas de limpieza.', estado: 'Activo', cantidadProductos: 100 },
    ];
  }
}
