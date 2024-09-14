import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { UserRegisterModalComponent } from '../../components/modals/user-register-modal/user-register-modal.component';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { AuthService } from '../../../../core/services/auth.service';
import { IResult } from '../../../../shared/models/IResult';
import { IUser } from '../../../../shared/models/IUser';
import { EditUserComponent } from '../../components/modals/edit-user/edit-user.component';
import { UserDetailComponent } from '../../components/modals/user-detail/user-detail.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatDialogModule, InputSearchComponent,
    UserDetailComponent,
    NgIf
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  IdUserSelect: number = 0;
  isOpen: boolean = false;
  users: IUser[] | undefined;
  searchMessage = "Buscar suarios"
  constructor(private _matDialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getUsers().subscribe((data: IResult<IUser[]>) => {
      if (data.isSuccess) {
        this.users = data.value;
        console.log(this.users);
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



  editarUser(id: any) {
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
  closeModal() { this.isOpen = false };
  userDetail(id: any) {
    this.isOpen = true;
    this.IdUserSelect = parseInt(id);
  }

}

