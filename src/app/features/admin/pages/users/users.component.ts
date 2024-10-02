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
import { UserPopupComponent } from '../../components/modals/user-popup/user-popup.component';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { JWTTokenService } from '../../../../core/services/jwttoken.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { UserDetailPopupComponent } from '../../components/modals/user-detail-popup/user-detail-popup.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatDialogModule, InputSearchComponent,
    NgIf, CurrencyPipe, DatePipe, MatTableModule, MatProgressSpinner, MatIcon, MatSidenavModule, UserDetailPopupComponent
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private sAuth = inject(AuthService);
  // private sJWT = inject(JWTTokenService);
  sSweetalert = inject(SweealertService);
  displayedColumns: string[] = ['id', 'profile', 'username', 'firstname', 'lastname', 'role', 'status', 'last_login', 'acciones'];
  isLoadingResults = true; isRateLimitReached = false;
  @ViewChild('sidenav') sidenav!: MatSidenav
  resultsLength = 0;
  hoveredRow: IUser | null = null

  selectedId: any;
  isOpen: boolean = false;
  users: IUser[] = [];
  searchMessage = "Buscar usuarios"
  constructor(private _matDialog: MatDialog, private authService: AuthService, private sTitle: TitleService) {
    this.sTitle.setTitle('Usuarios')
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.sSweetalert.showLoading();
    this.authService.getUsers().subscribe((data: IResult<IUser[]>) => {
      if (data.isSuccess) {
        this.users = data.value ?? [];
        this.sSweetalert.closeLoading();
      }
    })
  }

  onSearch(value: string) {
    console.log(value);
  }

  openModalCreate() {
    this._matDialog.open(UserPopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: {}
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUsers();
      }
    });
  }

  openModalModify(user: any) {
    this._matDialog.open(UserPopupComponent, {
      width: '60vw',
      maxWidth: '60vw',
      disableClose: true,
      data: { payload: user }
    }).afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.getAllUsers();
      }
    })
  }

  toggleDropdown(event: MouseEvent) {
    const dropdown = (event.target as HTMLElement).nextElementSibling;
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }

  closeModal() { this.isOpen = false };

  onDeleteUser(user: IUser) {
    this.sSweetalert.showConfirmation(`Quieres eliminar el usuario: ${user.username}`, () => {
      this.sAuth.deleteUser(user.id).subscribe((data: IResult<string>) => {
        if (data.isSuccess) {
          this.sSweetalert.showSuccess('Usuario eliminado')
        } else {
          this.sSweetalert.showError("No se pudo eliminar el usuario")
        }
      })
    });
  }

  onViewDetails(id: any): void {
    this.selectedId = id;
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }
}

