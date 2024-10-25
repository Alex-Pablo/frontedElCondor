import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../core/services/reports.service';
import { IUserReportsDto } from '../../../../shared/models/IUserReports';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IUser } from '../../../../shared/models/IUser';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { TitleService } from '../../../../core/services/title.service';
import { AuthService } from '../../../../core/services/auth.service';

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

  logocondor: string = '/img/logo.png';
  nombreempresa: string = 'Ferreteria El Condor';
  numeroempresa: string = '+502 31588772';
  correoempresa: string = 'elcondor2114@gmail.com';
  direccionempresa: string = 'Sololá. 6ta ave 4-55 zona 2 Barrio El Calvario';
  
  constructor(private reportsService: ReportsService, private sTitle: TitleService, private authService: AuthService) {
    this.sTitle.setTitle("Reportes-Usuarios")
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
        console.log(this.reportUsers);
      }
    });
  }

  // Función para exportar la tabla junto con el título a PDF
  exportToPDF() {
    const DATA: any = document.getElementById('reportContent');
    const PDF = new jsPDF('p', 'mm', 'a4');
  
    // Obtener fecha y hora actuales
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
  
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

