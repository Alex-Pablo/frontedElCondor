import { CommonModule} from '@angular/common';
import { Component, EventEmitter, Input, Output,inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { ICategorias } from '../../../../../shared/models/Icategorias';


@Component({
  selector: 'app-categoria-detail-popup',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIcon, CommonModule],
  templateUrl: './categoria-detail-popup.component.html',
  styleUrl: './categoria-detail-popup.component.scss'
})
export class CategoriaDetailPopupComponent {
  @Input() id!: any;
  @Output() closeSidenav: EventEmitter<void> = new EventEmitter<void>();

  categoriaDetail: ICategorias | undefined;

 
  
  

  public close() {
    console.log('sii');
    this.closeSidenav.emit();
  }
}
