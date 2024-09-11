import { Component } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { UserRegisterModalComponent } from '../../components/modals/user-register-modal/user-register-modal.component';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatDialogModule, InputSearchComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  searchMessage = "Buscar usuarios"
  constructor(private _matDialog: MatDialog) {
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
  //datos para la tabla
  users = [
    {
      no: '#1',
      foto: 'path_to_user_image',
      nombre: 'Edwin Alvarez',
      role: 'Administrador',
      ultimaActividad: '26/8/2024 3:23',
      estado: 'activo',
      creacion: '26/8/2024 10:23',
    },
    // Más usuarios
  ];
}

