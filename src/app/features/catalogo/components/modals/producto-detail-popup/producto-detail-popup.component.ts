import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../../../../core/services/auth.service';
import { BaseApiService } from '../../../../../core/services/base-api.service';
import { IResult } from '../../../../../shared/models/IResult';


@Component({
  selector: 'app-producto-detail-popup',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIcon, CommonModule],
  templateUrl: './producto-detail-popup.component.html',
  styleUrl: './producto-detail-popup.component.scss'
})
export class ProductoDetailPopupComponent {
  _MatDialgoRef = inject(MatDialogRef<ProductoDetailPopupComponent>)
  ProductDetail: any;
  sBaseApi = inject(BaseApiService)
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.loadProductDetails(this.data.id)
  }

  loadProductDetails(id: any): void {
    this.sBaseApi.getDetail('product', id).subscribe((data: IResult<any>) => {
      this.ProductDetail = data.value;
    });
  }
}

