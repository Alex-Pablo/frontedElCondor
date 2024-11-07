import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../../core/services/sale.service';
import { SaleDto } from '../../../../shared/models/ISale';
import { ApiResponse } from '../../../../shared/models/IApiResponse';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IUser } from '../../../../shared/models/IUser';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { TitleService } from '../../../../core/services/title.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IEnterprise } from '../../../../shared/models/IEnterprise';
import { EnterpriseService } from '../../../../core/services/enterprise.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, MatTableModule, MatIcon],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'total', 'iD_User', 'saleDate', 'productsTotal'];
  salesReport: SaleDto[] = [];
  userInfor: IUser | undefined; // Información del usuario autenticado
  enterpriseInfor: IEnterprise | undefined;

  logocondor: string = '/img/logo.png';
  private apiUrl = 'https://localhost:7059/api/Enterprise/detail/';

  // Parámetros de búsqueda
  numberDTE: string = '1';
  startDate: string = '';
  endDate: string = '';

  constructor(
    private saleService: SaleService,
    private titleService: TitleService,
    private authService: AuthService,
    private http: HttpClient,
    private enterpriseService: EnterpriseService
  ) {
    this.titleService.setTitle("Reportes-Ventas");
  }

  getEnterpriseById(id: number): Observable<ApiResponse<IEnterprise>> {
    return this.http.get<ApiResponse<IEnterprise>>(`${this.apiUrl}${id}`);
  }

  ngOnInit(): void {
    // Obtener la información del usuario autenticado
    this.authService.getProfile().subscribe((response) => {
      if (response.isSuccess) {
        this.userInfor = response.value; // Almacenar la información del usuario
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

  fetchSalesReport(): void {
    this.saleService.filterSales(this.numberDTE, this.startDate, this.endDate).subscribe((response) => {
      if (response.isSuccess) {
        this.salesReport = response.value ?? [];
      } else {
        console.error('Error al obtener el reporte de ventas:', response.error);
      }
    });
  }

  // Función para exportar la tabla junto con el título a PDF
  exportToPDF() {
    const DATA: any = document.getElementById('reportContent');
    const PDF = new jsPDF('p', 'mm', 'a4');

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

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
      PDF.save(`reporte-ventas-${date}-${time}.pdf`);
    });
  }
}
