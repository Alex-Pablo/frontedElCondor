import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { UserRegisterModalComponent } from '../../components/modals/user-register-modal/user-register-modal.component';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { AuthService } from '../../../../core/services/auth.service';
import { IResult } from '../../../../shared/models/IResult';
import { IUser } from '../../../../shared/models/IUser';
import { EditUserComponent } from '../../components/modals/edit-user/edit-user.component';
import { UserDetailComponent } from '../../components/modals/user-detail/user-detail.component';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon'
import { Title } from '@angular/platform-browser';
import { TitleService } from '../../../../core/services/title.service';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatDialogModule, InputSearchComponent,
    UserDetailComponent,
    NgIf, CurrencyPipe, DatePipe, MatTableModule, MatProgressSpinner, MatIcon
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'profile', 'email', 'phoneNumber', 'firstname', 'lastname', 'role', 'estado', 'last_Login', 'acciones'];
  isLoadingResults = true; isRateLimitReached = false;
  resultsLength = 0;
  hoveredRow: IUser | null = null

  IdUserSelect: number = 0;
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
    this.authService.getUsers().subscribe((data: IResult<IUser[]>) => {
      if (data.isSuccess) {
        this.users = data.value ?? [];
      }
    })
  }

  onSearch(value: string) {
    console.log(value);
  }
  crearUsuario() {

    this._matDialog.open(UserRegisterModalComponent, {
      width: '90vw',
      height: '80vh',
      disableClose: true
    }).afterClosed().subscribe(() => {
      this.getAllUsers();
    })
  }

  toggleDropdown(event: MouseEvent) {
    const dropdown = (event.target as HTMLElement).nextElementSibling;
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }

  logFieldName(fieldName: string) {
    console.log(fieldName);
  }



  closeModal() { this.isOpen = false };



  onEditUser(id: any) {
    const idNum = parseInt(id);
    this._matDialog.open(EditUserComponent, {
      width: '90vw',
      height: '80vh',
      disableClose: true,
      data: { id: idNum }
    }).afterClosed().subscribe(() => {
      this.getAllUsers();
    });
  }

  onDeleteUser(id: any): void {
    const idNum = parseInt(id);
    Swal.fire({
      title: "¿Quieres eliminar el usuario?",
      text: `Se eliminará el usuario con el id ${idNum}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(idNum).subscribe((data) => {
          if (data.isSuccess) {
            Swal.fire({
              title: "Eliminado!",
              text: "El usuario se ha eliminado",
              icon: "success"
            })
            this.getAllUsers();
          }
        })
      }
    })
  }

  onViewDetails(id: any): void {
    this.isOpen = true;
    this.IdUserSelect = parseInt(id);
  }

}

