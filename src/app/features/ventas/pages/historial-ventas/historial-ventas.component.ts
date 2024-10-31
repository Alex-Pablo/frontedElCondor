import { TitleService } from '../../../../core/services/title.service';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { MatIcon } from '@angular/material/icon';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatTableModule } from '@angular/material/table';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HistorialDetailPopupComponent } from '../../components/historial-detail-popup/historial-detail-popup.component';


@Component({
  selector: 'app-historial-ventas',
  standalone: true,
  imports: [InputSearchComponent, MatIcon, MatTableModule, MatSidenavModule],
  templateUrl: './historial-ventas.component.html',
  styleUrl: './historial-ventas.component.scss'
})
export class HistorialVentasComponent {
  constructor(
    private _matDialog: MatDialog, private authService: AuthService, private sTitle: TitleService) {
    this.sTitle.setTitle('Ventas / Historial');
    
  }
  searchMessage = "Buscar ventas";
// Datos de ejemplo para dataSource en el componente principal:
dataSource: any[] = [
  {
    id: 1,
    date: '12/08/2024',
    user: 'Alex Pablo',
    totalventa: 100,
    cantprod: 2,
    products: [
      { name: 'Pintura rojo', quantity: 1, discount: 5, subTotal: 30, total: 25 },
      { name: 'Martillo', quantity: 1, discount: 0, subTotal: 20, total: 20 }
    ]
  },
  // Otros objetos...
];

  displayedColumns: string[] = ['id', 'date', 'user', 'totalventa', 'cantprod', 'acciones'];

  onSearch(value: string) {
    console.log(value);
  }
/*
  onViewDetails(selectedId: string) {
    console.log('id', selectedId)
    this._matDialog.open(HistorialDetailPopupComponent, {
      data: { id: selectedId },
      width: '350px',
      height: '100vh',
      maxHeight: '100vh',
      position: { right: '0' },
      panelClass: 'dialog-detail'
    });
  }*/

    onViewDetails(selectedId: number) {
      const selectedData = this.dataSource.find(item => item.id === selectedId);
      
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
    

}
