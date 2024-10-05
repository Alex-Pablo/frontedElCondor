import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../../../../core/services/auth.service';
import { IResult } from '../../../../../shared/models/IResult';
import { IUserDetailDto } from '../../../../../shared/models/IUserDetail';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-user-detail-popup',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIcon, MatDivider, CommonModule, DatePipe],
  templateUrl: './user-detail-popup.component.html',
  styleUrl: './user-detail-popup.component.scss'
})
export class UserDetailPopupComponent implements OnChanges {
  @Input() id: any;
  @Output() closeSidenav: EventEmitter<void> = new EventEmitter<void>();
  private sAuth = inject(AuthService);
  userDetail: IUserDetailDto | undefined;
  public close() {
    this.closeSidenav.emit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id) {
      this.loadUserDetails(this.id);
    }
  }

  loadUserDetails(id: any): void {
    this.sAuth.getUserDetail(id).subscribe((data: IResult<IUserDetailDto>) => {
      this.userDetail = data.value;
      console.log(this.userDetail);
    });
  }


}
