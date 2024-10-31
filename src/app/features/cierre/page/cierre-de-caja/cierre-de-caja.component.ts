import { Component } from '@angular/core';
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
  selector: 'app-cierre-de-caja',
  standalone: true,
  imports: [],
  templateUrl: './cierre-de-caja.component.html',
  styleUrl: './cierre-de-caja.component.scss'
})
export class CierreDeCajaComponent {
logocondor: string = '/img/logo.png';


}
