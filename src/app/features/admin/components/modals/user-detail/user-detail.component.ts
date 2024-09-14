import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  @Output() closeModalvalue = new EventEmitter<boolean>();
  @Input() IdUser: number = 0;  // Este valor lo recibes desde un componente padre.
  userData: any;  // Aquí se almacenará la información del usuario obtenida de la API.
  isOpen = false;  // Controla la visibilidad del modal.

  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log(this.IdUser);  // Para verificar que el ID se esté pasando correctamente.
    this.loadUserData();  // Carga los datos del usuario al iniciar.
  }


  loadUserData() {
    if (this.IdUser) {
      this.authService.getUserDetail(this.IdUser).subscribe((data) => {
        console.log('Respuesta de la API:', data); // Verifica la respuesta completa
        if (data.isSuccess) {
          this.userData = data.value;
          console.log('Datos cargados:', this.userData); // Verifica los datos asignados
        }
      });
    }
  }
  
  // loadUserData() {
  //   if (this.IdUser) {  // Verifica que haya un ID válido antes de hacer la solicitud.
  //     this.authService.getUserDetail(this.IdUser).subscribe((data) => {
  //       if (data.isSuccess) {
  //         this.userData = data.value;  // Guarda los datos obtenidos en userData.
  //         console.log(this.userData);  // Visualiza los datos en la consola para depuración.
  //       }
  //     });
  //   }
  // }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.closeModalvalue.emit(false);  // Emite un evento al componente padre para cerrar el modal.
    this.isOpen = false;
  }
}
