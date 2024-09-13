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
    //Para la jennfier que ven cochinadas
    //Aqui tienes que llamar tu modal como  el crearUsuario
    //tendrias que pasarle el id del usuarios idNum
    this.authService.getUserById(idNum).subscribe((data) => {
      if (data.isSuccess) {
        console.log(data.value);//aqui puedes ver los datos qye se trae la baase de daots
      }
    })
  }

  userDetail(id: any) {
    const idNum = parseInt(id);
    //Para Royer mi bebe
    //aqui deberias llamar tu modal. cuando llames al modal. le pasas el id de usuarios que es idNum.
    //Ya estando en el modal pones esta petifion este codigo
    this.authService.getUserDetail(idNum).subscribe((data) => {
      if (data.isSuccess) {
        console.log(data.value);// aqui puedes ver los datos que se traer en la base de datos
      }
    })
  }

}

