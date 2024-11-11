import { Component, inject, NgModule, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IUser } from '../../../../shared/models/IUser';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../../../../app.component';
import { BaseApiService } from '../../../../core/services/base-api.service';
import { IResult } from '../../../../shared/models/IResult';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { TitleService } from '../../../../core/services/title.service';


@Component({
  selector: 'app-apertura',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './apertura.component.html',
  styleUrl: './apertura.component.scss'
})

export class AperturaComponent implements OnInit {
  logocondor: string = '/img/logo.png';
  userInfor: IUser | undefined;
  saldoInicial: number = 1000;
  _BaseApi = inject(BaseApiService)
  _SweetAlert = inject(SweealertService)
  sTitle = inject(TitleService);

  ngOnInit(): void {

    this.sTitle.setTitle('Apertura de caja');
  }

  onSubmit() {
    this._SweetAlert.showLoading();
    const oApertua = {
      openingAmount: this.saldoInicial
    }
    this._BaseApi.addItem("cashSession", oApertua).subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this._SweetAlert.showSuccess("Apertura Correcta")
      } else {
        this._SweetAlert.showError(data.error || "Error al registrar la apertura.");
      }
    })
  }



}
