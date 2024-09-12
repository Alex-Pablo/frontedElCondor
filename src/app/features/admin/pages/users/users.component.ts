import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { UserRegisterModalComponent } from '../../components/modals/user-register-modal/user-register-modal.component';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { AuthService } from '../../../../core/services/auth.service';
import { IResult } from '../../../../shared/models/IResult';
import { IUser } from '../../../../shared/models/IUser';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatDialogModule, InputSearchComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] | undefined;
  searchMessage = "Buscar suarios"
  constructor(private _matDialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
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
}

