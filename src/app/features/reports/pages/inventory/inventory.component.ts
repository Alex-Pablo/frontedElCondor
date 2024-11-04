import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../../../core/services/inventory.service';
import { IInventoryReportDto } from '../../../../shared/models/IInventoryReport';
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
  selector: 'app-inventory-report',
  standalone: true,
  imports: [CommonModule, DatePipe, MatTableModule, MatIcon],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryReportComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'code', 'description', 'purchasePrice', 'salePrice', 'unidOfMeasure', 'stock', 'status', 'created_at', 'updated_at']; // Columnas de la tabla
  reportInventory: IInventoryReportDto[] = []; // Almacena los datos del inventario
  userInfo: IUser | undefined; // Información del usuario autenticado
  enterpriseInfo: IEnterprise | undefined; // Información de la empresa
  hoveredRow: IInventoryReportDto | null = null;

  private apiUrl = 'https://localhost:7059/api/Enterprise/detail/';

  constructor(
    private inventoryService: InventoryService,
    private titleService: TitleService,
    private authService: AuthService,
    private http: HttpClient,
    private enterpriseService: EnterpriseService
  ) {
    this.titleService.setTitle("Reportes - Inventario");
  }

  ngOnInit(): void {
    // Obtener la información del usuario autenticado
    this.authService.getProfile().subscribe((response) => {
      if (response.isSuccess) {
        this.userInfo = response.value; // Almacenar la información del usuario
      }
    });

// Cargar el reporte de inventario
this.inventoryService.getInventoryReport().subscribe(
    (reportInventory) => {
      this.reportInventory = reportInventory; // Asigna directamente el arreglo
      console.log('Reporte de inventario:', this.reportInventory); // Verifica que los datos estén aquí
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
          case 'S':
            return 'Disponible';
          case 'P':
            return 'Registrado';
          default:
            return 'Desconocido'; // Valor por defecto si no coincide
        }
      }

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
      PDF.save(`reporte-inventario-${date}-${time}.pdf`);
    });
  }
}