import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../core/services/reports.service';
import { IUserReportsDto } from '../../../../shared/models/IUserReports';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IUser } from '../../../../shared/models/IUser';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { TitleService } from '../../../../core/services/title.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IEnterprise, ApiResponse } from '../../../../shared/models/IEnterprise';
import { EnterpriseService } from '../../../../core/services/enterprise.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DatePipe, MatTableModule, MatIcon],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'firstname', 'lastname', 'stateUser', 'last_login_at', 'created_at', 'last_logout_at', 'updated_at', 'role'];
  reportUsers: IUserReportsDto[] = [];
  userInfor: IUser | undefined;
  enterpriseInfor: IEnterprise | undefined;

  logocondor: string = '/img/logo.png';

  private apiUrl = 'https://localhost:7059/api/Enterprise/detail/';

  constructor(private reportsService: ReportsService, private sTitle: TitleService, private authService: AuthService, private http: HttpClient, private enterpriseService: EnterpriseService) {
    this.sTitle.setTitle("Reportes-Usuarios")
  }

  getEnterpriseById(id: number): Observable<ApiResponse<IEnterprise>> {
    return this.http.get<ApiResponse<IEnterprise>>(`${this.apiUrl}${id}`);
  }

  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;
  hoveredRow: IUserReportsDto | null = null
  ngOnInit(): void {
    // Usar el método getProfile para obtener la información del usuario autenticado
    this.authService.getProfile().subscribe((response) => {
      if (response.isSuccess) {
        this.userInfor = response.value; // Almacenar la información del usuario
      }
    });

    this.reportsService.getUserReports().subscribe((data) => {
      if (data.isSuccess) {
        this.reportUsers = data.value ?? [];
      }
    });

    // Obtener información de la empresa con ID 1
    this.enterpriseService.getEnterpriseById(1).subscribe((data) => {
      if (data.isSuccess) {
        this.enterpriseInfor = data.value; // Accede a data.value
      } else {
        console.error('Error al obtener datos de la empresa:', data.error);
      }
    });
  }

  // Método para traducir el estado
  getStatusDescription(stateUser: string): string {
    switch (stateUser) {
      case 'A':
        return 'Activo';
      case 'I':
        return 'Inactivo';
      default:
        return 'Desconocido'; // Valor por defecto si no coincide
    }
  }

  // Función para exportar la tabla junto con el título a PDF
  exportToPDF() {
    const DATA: any = document.getElementById('reportContent');
    const PDF = new jsPDF('p', 'mm', 'a4');

    // Obtener fecha y hora actuales
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    // Obtener la URL del logo
    const logoUrl = this.enterpriseInfor?.logo;

    // Actualizar contenido dinámico
    // Actualizar contenido dinámico
    const reportDate = document.getElementById('reportDate');
    const reportMonth = document.getElementById('reportMonth');
    const reportUser = document.getElementById('reportUser');

    if (reportDate) {
      reportDate.textContent = ` ${date}, ${time}`;
    }

    if (reportMonth) {
      reportMonth.textContent = ` ${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`;
    }

    if (reportUser) {
      reportUser.textContent = ` ${this.userInfor?.firstname} ${this.userInfor?.lastname}`
    }
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');

      PDF.addImage(FILEURI, 'PNG', 0, 0, fileWidth, fileHeight);
      PDF.save(`reporte-usuarios-${date}-${time}.pdf`);
    });
  }
}

//     // Crear una nueva imagen y cargar el logo
//   const logoImage = new Image();
//   logoImage.src = logoUrl || '';
//   logoImage.onload = () => {
//     // Cuando la imagen se haya cargado, genera el PDF
//     html2canvas(DATA).then((canvas) => {
//       const fileWidth = 208;
//       const fileHeight = (canvas.height * fileWidth) / canvas.width;
//       const FILEURI = canvas.toDataURL('image/png');

//       // Añadir la imagen del logo al PDF
//       PDF.addImage(logoImage, 'PNG', 10, 10, 30, 30); // Ajusta la posición y tamaño según sea necesario
//       PDF.addImage(FILEURI, 'PNG', 0, 40, fileWidth, fileHeight); // Ajusta para no sobrescribir el logo
//       PDF.save(`reporte-usuarios-${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}.pdf`);
//     });
//   };

//   logoImage.onerror = () => {
//     console.error('Error al cargar el logo de la empresa.');
//   };
// }
// }

