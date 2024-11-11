import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { TitleService } from '../../../../core/services/title.service';
import { UnitofmeasurePopupComponent, UnitOfMeasure } from '../../components/modals/unitofmeasure-popup/unitofmeasure-popup.component';
import { InputSearchComponent } from "../../../../shared/components/input-search/input-search.component";
import { MatIcon } from '@angular/material/icon';
import { IResult } from '../../../../shared/models/IResult';

@Component({
  selector: 'app-unitofmeasurements',
  standalone: true,
  imports: [MatIcon, MatTableModule, MatSidenavModule, InputSearchComponent],
  templateUrl: './unitofmeasurements.component.html',
  styleUrls: ['./unitofmeasurements.component.scss']
})
export class UnitofmeasurementsComponent implements OnInit {
  sBaseApi = inject(BaseApiService);
  sTitle = inject(TitleService);
  sSweetalert = inject(SweealertService);
  _matDialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'name', 'abbreviation', 'description', 'acciones'];
  dataSource: MatTableDataSource<UnitOfMeasure> = new MatTableDataSource<UnitOfMeasure>([]);
  selectedUnitOfMeasure: UnitOfMeasure | null = null;
  searchMessage = 'Buscar unidad de medida';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  ngOnInit(): void {
    this.sTitle.setTitle('Unidades de Medida');
    this.getAllUnitsOfMeasure();
  }

  getAllUnitsOfMeasure() {
    this.sBaseApi.getItems('unitOfMeasure').subscribe((data: any) => {
      if (data.isSuccess) {
        this.dataSource.data = data.value;
      }
    });
  }

  onSearch(id: any) {
    console.log(id);
  }

  onViewDetails(unit: UnitOfMeasure) {
    this.selectedUnitOfMeasure = unit;
    if (this.sidenav) {
      this.sidenav.open();
    } else {
      console.error('El sidenav no está definido.');
    }
  }

  onOpenModal() {
    this._matDialog.open(UnitofmeasurePopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: {
        title: 'Agregar Unidad de Medida',
        payload: { id: 0, name: '', abbreviation: '', description: '', products: '' }
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUnitsOfMeasure();
      }
    });
  }

  onEdit(unit: UnitOfMeasure) {
    this._matDialog.open(UnitofmeasurePopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: {
        title: 'Editar Unidad de Medida',
        payload: { ...unit }
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUnitsOfMeasure();
      }
    });
  }

  onDelete(unit: UnitOfMeasure) {
    this.sSweetalert.showConfirmation(`¿Quieres eliminar la unidad de medida: ${unit.name}?`, () => {
      this.sBaseApi.removeItem('unitOfMeasure', unit.id).subscribe((data: IResult<any>) => {
        if (data.isSuccess) {
          this.sSweetalert.showSuccess('Unidad de medida eliminada');
          this.getAllUnitsOfMeasure();
        } else {
          this.sSweetalert.showError(data.error || 'Error al eliminar la unidad de medida');
        }
      });
    });
  }
}


// import { Component, inject, OnInit, ViewChild } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatTableModule } from '@angular/material/table';
// import { MatIcon } from '@angular/material/icon';
// import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
// import { BaseApiService } from '../../../../core/services/base-api.service';
// import { SweealertService } from '../../../../core/services/sweealert.service';
// import { TitleService } from '../../../../core/services/title.service';
// import { InputSearchComponent } from "../../../../shared/components/input-search/input-search.component";

// export interface UnitOfMeasure {
//   id: number;
//   name: string;
//   abbreviation: string;
//   description: string;
//   products: string;
// }

// @Component({
//   selector: 'app-unitofmeasurements',
//   standalone: true,
//   imports: [MatIcon, MatTableModule, MatSidenavModule, InputSearchComponent],
//   templateUrl: './unitofmeasurements.component.html',
//   styleUrls: ['./unitofmeasurements.component.scss']
// })
// export class UnitofmeasurementsComponent implements OnInit {
//   sBaseApi = inject(BaseApiService);
//   sTitle = inject(TitleService);
//   sSweetalert = inject(SweealertService);
//   _matDialog = inject(MatDialog);

//   displayedColumns: string[] = ['id', 'name', 'abbreviation', 'description', 'products', 'acciones'];
//   dataSource: UnitOfMeasure[] = [];
//   selectedUnitOfMeasure: UnitOfMeasure | null = null;
//   searchMessage = 'Buscar unidad de medida';
//   @ViewChild('sidenav') sidenav!: MatSidenav;

//   ngOnInit(): void {
//     this.sTitle.setTitle('Unidades de Medida');
//     this.getAllUnitsOfMeasure();
//   }

//   getAllUnitsOfMeasure() {
//     this.sBaseApi.getItems('unitOfMeasure').subscribe((data: any) => {
//       if (data.isSuccess) {
//         this.dataSource = data.value;
//       }
//     });
//   }

//   onSearch(id: any) {
//     console.log(id);
//   }

//   onViewDetails(unit: UnitOfMeasure) {
//     this.selectedUnitOfMeasure = unit;
//     if (this.sidenav) {
//       this.sidenav.open();
//     } else {
//       console.error('El sidenav no está definido.');
//     }
//   }

//   onOpenModal() {
//     this._matDialog.open(UnitofmeasurementsComponent, {
//       width: '60vw',
//       maxWidth: '60vw',
//       disableClose: true,
//       data: {}
//     }).afterClosed().subscribe((result) => {
//       if (result) {
//         this.getAllUnitsOfMeasure();
//       }
//     });
//   }

//   onDelete(unit: UnitOfMeasure) {
//     this.sSweetalert.showConfirmation(`¿Quieres eliminar la unidad de medida: ${unit.name}?`, () => {
//       this.sBaseApi.removeItem('unitOfMeasure', unit.id).subscribe((data: any) => {
//         if (data.isSuccess) {
//           this.sSweetalert.showSuccess('Unidad de medida eliminada');
//           this.getAllUnitsOfMeasure();
//         } else {
//           this.sSweetalert.showError(data.error || 'Hubo un error al eliminar la unidad de medida');
//         }
//       });
//     });
//   }

//   onEdit(unit: UnitOfMeasure) {
//     this._matDialog.open(UnitofmeasurementsComponent, {
//       width: '60vw',
//       maxWidth: '60vw',
//       disableClose: true,
//       data: { payload: unit }
//     }).afterClosed().subscribe((result) => {
//       if (result) {
//         this.getAllUnitsOfMeasure();
//       }
//     });
//   }

//   closeSidenav() {
//     this.sidenav.close();
//   }
// }
