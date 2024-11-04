import { Component, inject, NgModule } from '@angular/core';
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


@Component({
  selector: 'app-apertura',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './apertura.component.html',
  styleUrl: './apertura.component.scss'
})

export class AperturaComponent {
  logocondor: string = '/img/logo.png';
  userInfor: IUser | undefined;
  saldoInicial: number = 1000;
  _BaseApi = inject(BaseApiService)
  _SweetAlert = inject(SweealertService)

  onSubmit() {
    this._SweetAlert.showLoading();
    const aperturaData = {
      saldoInicial: this.saldoInicial
    };

    console.log('Datos de Apertura:', aperturaData);

    const oApertua = {
      openingAmount: 40
    }
    this._BaseApi.addItem("cashSession", oApertua).subscribe((data: IResult<any>) => {
      console.log("resultado de apertura", data)
      if (data.isSuccess) {
        this._SweetAlert.showSuccess("Apertura Correcta")
      } else {
        this._SweetAlert.showError(data.error||"Error al registrar la apertura.");
      }
    })
  }



}
