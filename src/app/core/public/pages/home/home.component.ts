import { Component, inject, OnInit } from '@angular/core';
import { ICategorias } from '../../../../shared/models/Icategorias';
import { NgFor } from '@angular/common';
import { SweealertService } from '../../../services/sweealert.service';
import { IResult } from '../../../../shared/models/IResult';
import { BaseApiService } from '../../../services/base-api.service';



interface Producto {
  id: number;
  productName: string;
  productId: number;
  supplierName: string | null;
  quantityInStock: number;
  stockMin: number;
  status: string;
  updated_at: string | null;
  img: string;
  code: string;
  key: string;
  salePrice: number | null;
  cantidad?: number;
  descuento?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  NombreEmpresa: string = 'EL CONDOR';
  imageUrl: string = 'img/Cuchara.jpg';
  Titulo: string = 'Cuchara para albañil.';
  Precio: string = 'Q23';
  Disponible: number = 34;
  Codigo: string = '#323435';
  _sSweetAlet = inject(SweealertService)
  _BaseApi = inject(BaseApiService);
  productos: Producto[] = []
  aItemsCategory: any;
  categorias: ICategorias[] = [
    {
      id: 1,
      name: "Carpinteria"
    },
    {
      id: 2,
      name: "Construccion"
    }
  ]

  ngOnInit(): void {
    this._BaseApi.getItems('category').subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this.aItemsCategory = data.value;
        console.log(data.value)
      }
    })

    this.selectCategory("all")
  }


  selectCategory(id: any) {
    this._sSweetAlet.showLoading();
    this._BaseApi.getItemsById('inventory/category', id).subscribe((data: IResult<any>) => {
      if (data.isSuccess) {
        this.productos = data.value
        console.log(data.value)
        this._sSweetAlet.closeLoading();
      } else {
        this._sSweetAlet.showError("Error")
      }
    })
  }


}


