import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inject, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { IEmpresa } from '../../../../../shared/models/IEmpresa';
import { BaseApiService } from '../../../../../core/services/base-api.service';
import { IResult } from '../../../../../shared/models/IResult';


@Component({
  selector: 'app-proveedor-detail-popup',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIcon, CommonModule],
  templateUrl: './proveedor-detail-popup.component.html',
  styleUrl: './proveedor-detail-popup.component.scss'
})
export class ProveedorDetailPopupComponent implements OnInit{
  _MatDialgoRef = inject(MatDialogRef<ProveedorDetailPopupComponent>)
  sBaseApi = inject(BaseApiService)

proveedordetail:any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit(): void {
    this.loadProveedoresDetails(this.data.id)
  }
  loadProveedoresDetails(id: any): void {
    this.sBaseApi.getDetail('supplier',id).subscribe((data: IResult<any>) => {
      this.proveedordetail=data.value
    console.log(this.proveedordetail)
    });
  }


  
}

