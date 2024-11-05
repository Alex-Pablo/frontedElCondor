import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderReportService } from '../../../../core/services/order-report.service';
import { IOrderDto } from '../../../../shared/models/IOrder';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IUser } from '../../../../shared/models/IUser';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { TitleService } from '../../../../core/services/title.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IEnterprise } from '../../../../shared/models/IEnterprise';
import { EnterpriseService } from '../../../../core/services/enterprise.service';
import { ApiResponse } from '../../../../shared/models/IApiResponse';

@Component({
  selector: 'app-order-report',
  standalone: true,
  imports: [CommonModule, DatePipe, MatTableModule, MatIcon],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderReportComponent implements OnInit {
  displayedColumns: string[] = ['id', 'supplier', 'supplierContact', 'productsTotal', 'priceTotal', 'status', 'timeOrder']; // Columnas de la tabla
  orderReport: IOrderDto[] = []; // Almacena los datos de las órdenes
  userInfo: IUser | undefined; // Información del usuario autenticado
  enterpriseInfo: IEnterprise | undefined; // Información de la empresa

  logocondor: string = '/img/logo.png';

  private apiUrl = 'https://localhost:7059/api/Enterprise/detail/';

  constructor(
    private orderReportService: OrderReportService,
    private titleService: TitleService,
    private authService: AuthService,
    private http: HttpClient,
    private enterpriseService: EnterpriseService
  ) {
    this.titleService.setTitle("Reportes - Órdenes");
  }

  ngOnInit(): void {
    // Obtener la información del usuario autenticado
    this.authService.getProfile().subscribe((response) => {
      if (response.isSuccess) {
        this.userInfo = response.value; // Almacenar la información del usuario
      }
    });

    // Cargar el reporte de órdenes
    this.orderReportService.getOrderReport().subscribe(
      (response: ApiResponse<IOrderDto[]>) => {
        if (response.isSuccess) {
          this.orderReport = response.value || []; // Asigna directamente el arreglo
          console.log('Reporte de órdenes:', this.orderReport); // Verifica que los datos estén aquí
        } else {
          console.error('Error al obtener el reporte:', response.error);
        }
      },
      (error) => {
        console.error('Error en la llamada a la API:', error);
      }
    );

    // Obtener información de la empresa con ID 1
    this.enterpriseService.getEnterpriseById(1).subscribe((data) => {
      if (data.isSuccess) {
        this.enterpriseInfo = data.value; // Acceder a data.value
        console.log('Datos de la empresa:', this.enterpriseInfo);
      } else {
        console.error('Error al obtener datos de la empresa:', data.error);
      }
    });
  }

  // Método para traducir el estado
  getStatusDescription(status: string): string {
    switch (status) {
    case 'E':
        return 'En Proceso';
    case 'P':
        return 'Pendiente';
    case 'C':
        return 'Recibido';
    case 'X':
        return 'Cancelado';
      default:
        return 'Desconocido'; // Valor por defecto si no coincide
    }
  }
         /// "P" = "Pendiente",
       /// "E" ="En proceso",
       /// "C" = "Recibida",
       /// "X" ="Cancelado"

  // Función para exportar la tabla a PDF
  exportToPDF() {
    const DATA: any = document.getElementById('reportContent');
    const PDF = new jsPDF('p', 'mm', 'a4');

    // Obtener fecha y hora actuales
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    // Actualizar contenido dinámico
    const reportMonth = document.getElementById('reportMonth');
    const reportDate = document.getElementById('reportDate');
    const reportUser = document.getElementById('reportUser');

    if (reportMonth) {
        reportMonth.textContent = ` ${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`;
    }

    if (reportDate) {
        reportDate.textContent = ` ${date}, ${time}`;
    }

    if (reportUser) {
        reportUser.textContent = ` ${this.userInfo?.firstname} ${this.userInfo?.lastname}`;
    }

    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');

      PDF.addImage(FILEURI, 'PNG', 0, 0, fileWidth, fileHeight);
      PDF.save(`reporte-ordenes-${date}-${time}.pdf`);
    });
  }
}