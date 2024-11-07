// Importa MAT_DIALOG_DATA y injecta en el constructor
import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { IUser } from '../../../../shared/models/IUser';
import { IResult } from '../../../../shared/models/IResult';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../../shared/models/IApiResponse';
import { IEnterprise } from '../../../../shared/models/IEnterprise';
import { EnterpriseService } from '../../../../core/services/enterprise.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-historial-detail-popup',
  standalone: true,
  imports: [
    DatePipe, CommonModule,
  ],
  templateUrl: './historial-detail-popup.component.html',
  styleUrl: './historial-detail-popup.component.scss',
  providers: [DatePipe]
})
export class HistorialDetailPopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private enterpriseService: EnterpriseService) { console.log("Data de Constructor: ", data) }
  aSaleDetail: any;
  aUsers: IUser[] = [];
  _sAuth = inject(AuthService)
  _sSweetAlert = inject(SweealertService)
  enterpriseInfor: IEnterprise | undefined;
  private datePipe = inject(DatePipe);

  logocondor: string = '/img/logo.png';
  private apiUrl = 'https://localhost:7059/api/Enterprise/detail/';

  ngOnInit(): void {
    this._sSweetAlert.showLoading()
    this._sAuth.getUsers().subscribe((data: IResult<IUser[]>) => {
      if (data.isSuccess) {
        this.aUsers = data.value ?? [];
        this._sSweetAlert.closeLoading();
      } else {
        this._sSweetAlert.showError("Hubo un error")
      }
    })
    this.aSaleDetail = this.data.payload

    // Obtener información de la empresa con ID 1
    this.enterpriseService.getEnterpriseById(1).subscribe((data) => {
      if (data.isSuccess) {
        this.enterpriseInfor = data.value; // Accede a data.value
      } else {
        console.error('Error al obtener datos de la empresa:', data.error);
      }
    });
  }


  // getNameUser(Id: number): any {
  //   console.log(this.aUsers);
  //   const producto = this.aUsers.find(p => p.id == Id);
  //   return producto ? producto.username : Id;
  // }

  getEnterpriseById(id: number): Observable<ApiResponse<IEnterprise>> {
    return this.http.get<ApiResponse<IEnterprise>>(`${this.apiUrl}${id}`);
  }

  getNameUser(Id: number): string {
    const usuario = this.aUsers.find(p => p.id === Id);
    return usuario ? `${usuario.firstname.toUpperCase()} ${usuario.lastname.toUpperCase()}` : 'Desconocido'; // Devuelve 'Desconocido' si no se encuentra el usuario
  }

  getSubtotal(): number {
    return this.aSaleDetail.products.reduce((acc: number, product: any) => {
      return acc + (product.unit_price * product.quantity);
    }, 0);
  }

  getDescuento(): number {
    return this.aSaleDetail.products.reduce((acc: number, product: any) => {
      return acc + (product.discount * product.quantity);
    }, 0);
  }

  printReceipt(): void {
    const DATA: any = document.getElementById('receiptContent'); // Asegúrate de que el ID coincida
    html2canvas(DATA).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; // Ancho del PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Formatear la fecha y hora
      const formattedDateTime = this.datePipe.transform(this.aSaleDetail.saleDate, 'dd-MM-yyyy_HH-mm') || 'fecha-hora';

      pdf.save(`recibo-venta-${formattedDateTime}.pdf`);
    });
  }
}
