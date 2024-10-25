import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedor-detail-popup',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIcon, CommonModule],
  templateUrl: './proveedor-detail-popup.component.html',
  styleUrl: './proveedor-detail-popup.component.scss'
})
export class ProveedorDetailPopupComponent {
  @Input() id!: any;
  @Output() closeSidenav: EventEmitter<void> = new EventEmitter<void>();

  public close() {
    console.log('sii');
    this.closeSidenav.emit();
  }
}
