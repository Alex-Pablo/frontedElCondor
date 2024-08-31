import { Component } from '@angular/core';
import {MatDialogModule, MatDialog} from '@angular/material/dialog'
import { UserRegisterModalComponent } from '../../components/modals/user-register-modal/user-register-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  constructor(private _matDialog: MatDialog){

  }
  crearUsuario(){
    this._matDialog.open(UserRegisterModalComponent, {
      width: '90vw',
      height: '80vh',
      disableClose: true
    })
  }

  NombreEmpresa: string = 'EL CONDOR';
}
