import { CategoriaPopupComponent } from '../../components/modals/categoria-popup/categoria-popup.component';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { IResult } from '../../../../shared/models/IResult';
import { MatTableModule } from '@angular/material/table'
import { MatIcon } from '@angular/material/icon'
import { TitleService } from '../../../../core/services/title.service';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { CategoriaDetailPopupComponent } from '../../components/modals/categoria-detail-popup/categoria-detail-popup.component';
import { BaseApiService } from '../../../../core/services/base-api.service';



export interface Categoria {
  nombre: string;
  descripcion: string;
  estado: string; // 'Activo' o 'Inactivo'
  cantidadProductos: number;
}

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [InputSearchComponent, MatIcon, MatTableModule, MatSidenavModule, CategoriaDetailPopupComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'

})
export class CategoriaComponent implements OnInit {
  sBaseApi = inject(BaseApiService);
  displayedColumns: string[] = ['id', 'name', 'description', 'acciones'];
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
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: {}
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
    this.sSweetalert.showConfirmation(`Quieres eliminar la categoria: ${id}`, () => {
      this.sBaseApi.removeItem('Category', id).subscribe((data: IResult<any>) => {
        if (data.isSuccess) {
          this.sSweetalert.showSuccess('Categoria eliminada')
          this.getAllCategoria();
        } else {
          this.sSweetalert.showError(data.error || 'Hubo un errro al eliminar la categoria ')
        }
      })
    });
  }

  onEdit(categoria: any) {
    this._matDialog.open(CategoriaPopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: { payload: categoria }
    }).afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.getAllCategoria();
      }
    })
  }


  closeSidenav() {
    this.sidenav.close();
  }


  getAllCategoria() {
    this.sBaseApi.getItems('Category').subscribe((data: any) => {
      if (data.isSuccess) {
        this.dataSource = data.value;
      }
    })
  }
}
