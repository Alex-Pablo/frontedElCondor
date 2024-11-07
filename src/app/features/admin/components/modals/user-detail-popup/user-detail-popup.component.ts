import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../../../../core/services/auth.service';
import { IResult } from '../../../../../shared/models/IResult';
import { IUserDetailDto } from '../../../../../shared/models/IUserDetail';
import { MatDivider } from '@angular/material/divider';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail-popup',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIcon, MatDivider, CommonModule, DatePipe],
  templateUrl: './user-detail-popup.component.html',
  styleUrl: './user-detail-popup.component.scss'
})
export class UserDetailPopupComponent implements OnInit {

  _MatDialgoRef = inject(MatDialogRef<UserDetailPopupComponent>)
  private sAuth = inject(AuthService);
  userDetail: IUserDetailDto | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.loadUserDetails(this.data.id)
  }

  loadUserDetails(id: any): void {
    this.sAuth.getUserDetail(id).subscribe((data: IResult<IUserDetailDto>) => {
      this.userDetail = data.value;
    });
  }


}
