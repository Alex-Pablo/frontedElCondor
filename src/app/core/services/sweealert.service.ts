import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweealertService {

  constructor() { }
  showLoading(message: string = 'Cargando...') {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  // Cerrar la alerta de carga
  closeLoading() {
    Swal.close();
  }

  // Mostrar alerta de error
  showError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'OK'
    });
  }

  // Mostrar alerta de éxito
  showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Completado',
      text: message,
      confirmButtonText: 'OK'
    });
  }

  // Mostrar confirmación de eliminación
  showConfirmation(message: string, confirmCallback: () => void) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, cancelar',
      confirmButtonText: 'Si, eliminar!',
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCallback();
      }
    });
  }
}
