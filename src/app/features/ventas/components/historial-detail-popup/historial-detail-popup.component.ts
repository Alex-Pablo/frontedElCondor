/*import { Component } from '@angular/core';

@Component({
  selector: 'app-historial-detail-popup',
  standalone: true,
  imports: [],
  templateUrl: './historial-detail-popup.component.html',
  styleUrl: './historial-detail-popup.component.scss'
})
export class HistorialDetailPopupComponent {

}*/
// Importa MAT_DIALOG_DATA y injecta en el constructor
import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { IUser } from '../../../../shared/models/IUser';
import { IResult } from '../../../../shared/models/IResult';
import { SweealertService } from '../../../../core/services/sweealert.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historial-detail-popup',
  standalone: true,
  imports: [
    DatePipe,
  ],
  templateUrl: './historial-detail-popup.component.html',
  styleUrl: './historial-detail-popup.component.scss'
})
export class HistorialDetailPopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { console.log(data) }
  aSaleDetail: any;
  aUsers: IUser[] = [];
  _sAuth = inject(AuthService)
  _sSweetAlert = inject(SweealertService)

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
  }


  getNameUser(Id: number): any {
    console.log(this.aUsers);
    const producto = this.aUsers.find(p => p.id == Id);
    return producto ? producto.username : Id;
  }

}




