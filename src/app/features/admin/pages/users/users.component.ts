import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
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

