// import { Component, OnInit } from '@angular/core';
// import { SalesService } from '../../../../core/services/sales.service';
// import { ISalesReportDto } from '../../../../shared/models/ISalesReport';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { DatePipe } from '@angular/common';
// import { TitleService } from '../../../../core/services/title.service';

// @Component({
//   selector: 'app-sales-report',
//   standalone: true,
//   imports: [DatePipe],
//   templateUrl: './sales-report.component.html',
//   styleUrls: ['./sales-report.component.scss']
// })
// export class SalesReportComponent implements OnInit {
//   displayedColumns: string[] = ['id', 'product', 'quantity', 'price', 'total', 'date'];
//   salesReports: ISalesReportDto[] = [];
  
//   constructor(private salesService: SalesService, private sTitle: TitleService) {
//     this.sTitle.setTitle("Reporte de Ventas");
//   }

//   ngOnInit(): void {
//     this.salesService.getSalesReports().subscribe((data) => {
//       if (data.isSuccess) {
//         this.salesReports = data.value ?? [];
//       }
//     });
//   }

//   exportToPDF() {
//     const DATA: any = document.getElementById('reportContent');
//     const PDF = new jsPDF('p', 'mm', 'a4');

//     const now = new Date();
//     const date = now.toLocaleDateString();
//     const time = now.toLocaleTimeString();

//     const reportDate = document.getElementById('reportDate');
//     if (reportDate) {
//       reportDate.textContent = ` ${date}, ${time}`;
//     }

//     html2canvas(DATA).then((canvas) => {
//       const fileWidth = 208;
//       const fileHeight = (canvas.height * fileWidth) / canvas.width;
//       const FILEURI = canvas.toDataURL('image/png');

//       PDF.addImage(FILEURI, 'PNG', 0, 0, fileWidth, fileHeight);
//       PDF.save(`reporte-ventas-${date}-${time}.pdf`);
//     });
//   }
// }