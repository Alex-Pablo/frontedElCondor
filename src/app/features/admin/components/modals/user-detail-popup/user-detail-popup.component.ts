import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-user-detail-popup',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIcon, CommonModule],
  templateUrl: './user-detail-popup.component.html',
  styleUrl: './user-detail-popup.component.scss'
})
export class UserDetailPopupComponent {
  @Input() id!: any;
  @Output() closeSidenav: EventEmitter<void> = new EventEmitter<void>();

  public close() {
    console.log('sii');
    this.closeSidenav.emit();
  }
}
