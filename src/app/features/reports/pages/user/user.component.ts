import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../core/services/reports.service';
import { IUserReportsDto } from '../../../../shared/models/IUserReports';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { TitleService } from '../../../../core/services/title.service';

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
  constructor(private reportsService: ReportsService, private sTitle: TitleService) {
    this.sTitle.setTitle("Reportes-Usuarios")
  }


  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;
  hoveredRow: IUserReportsDto | null = null
  ngOnInit(): void {
    this.reportsService.getUserReports().subscribe((data) => {
      if (data.isSuccess) {
        this.reportUsers = data.value ?? [];
        console.log(this.reportUsers);
      }
    });
  }

  // Función para exportar la tabla junto con el título a PDF
  exportToPDF() {
    const DATA: any = document.getElementById('reportContent'); // Selecciona el div que contiene el título y la tabla
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('reportes-administrador.pdf'); // Guarda el archivo PDF con el título
    });
  }
}

