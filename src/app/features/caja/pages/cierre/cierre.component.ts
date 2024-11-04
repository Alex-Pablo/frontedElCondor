import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IUser } from '../../../../shared/models/IUser';
import { AuthService } from '../../../../core/services/auth.service';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { IResult } from '../../../../shared/models/IResult';
import { SweealertService } from '../../../../core/services/sweealert.service';


interface Denomination {
  label: string;
  value: number;
  quantity: number;
  subtotal: number;
}


@Component({
  selector: 'app-cierre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cierre.component.html',
  styleUrl: './cierre.component.scss'
})
export class CierreComponent {
  logocondor: string = '/img/logo.png';
  userInfor: IUser | undefined;
  currentDate: Date = new Date();
  totalAmount: number = 0;
  _BaseApi = inject(BaseApiService)
  _SweetAlert = inject(SweealertService)
  private intervalId: any;

  denominations: Denomination[] = [
    { label: 'Billetes de Q5.00', value: 5, quantity: 0, subtotal: 0 },
    { label: 'Billetes de Q10.00', value: 10, quantity: 0, subtotal: 0 },
    { label: 'Billetes de Q20.00', value: 20, quantity: 0, subtotal: 0 },
    { label: 'Billetes de Q50.00', value: 50, quantity: 0, subtotal: 0 },
    { label: 'Billetes de Q100.00', value: 100, quantity: 0, subtotal: 0 },
    { label: 'Billetes de Q200.00', value: 200, quantity: 0, subtotal: 0 },
    { label: 'Monedas de Q1.00', value: 1, quantity: 0, subtotal: 0 },
    { label: 'Monedas de Q0.50', value: 0.50, quantity: 0, subtotal: 0 },
    { label: 'Monedas de Q0.25', value: 0.25, quantity: 0, subtotal: 0 }
  ];

  importes: any[] = [
    { descripcion: 'Total Ventas', saldoAnterior: 0, entradas: 0, salidas: 0, total: 0 },
  ];
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((response) => {
      if (response.isSuccess) {
        this.userInfor = response.value;
      }
    });

    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  onCloseCashSession() {
    console.log("totall", this.totalAmount);
    const closeCashSession = {
      reportedClosingAmount: this.totalAmount
    };

    this._BaseApi.closeCashSession(closeCashSession).subscribe((data: IResult<any>) => {
      console.log(data);

      if (data.isSuccess) {
        this._SweetAlert.showSuccess("La sesión de caja se cerró con éxito");
      } else {
        this._SweetAlert.showError(data.error || "No hay una sesión de caja iniciada");
      }
    });
  }


  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  get total(): number {
    this.totalAmount = this.denominations.reduce((sum, denomination) => sum + denomination.subtotal, 0);
    return this.totalAmount
  }

  updateSubtotal(denomination: Denomination, quantityEvent: Event): void {
    const input = quantityEvent.target as HTMLInputElement;
    const quantityNumber = parseInt(input.value, 10);
    denomination.quantity = isNaN(quantityNumber) ? 0 : quantityNumber;
    denomination.subtotal = denomination.value * denomination.quantity;
  }

  /*EXPORTAR PDF */

  exportToPDF() {
    const DATA: any = document.getElementById('reportContent');
    const PDF = new jsPDF('p', 'mm', 'a4');

    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');

      PDF.addImage(FILEURI, 'PNG', 0, 0, fileWidth, fileHeight);
      const currentDateFormatted = this.currentDate.toLocaleString('es-GT', { dateStyle: 'short', timeStyle: 'short' });


      PDF.save(`cierre-caja-${currentDateFormatted}.pdf`);
    });
  }
}
