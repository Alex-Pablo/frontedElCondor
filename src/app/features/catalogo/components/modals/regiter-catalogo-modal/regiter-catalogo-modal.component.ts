import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BtnAcceptComponent } from '../../../../../shared/components/btn-accept/btn-accept.component';
import { BtnCloseComponent } from '../../../../../shared/components/btn-close/btn-close.component';


export interface CategoriaProducto {
  id: number;
  nombre: string;
  descripcion: string;
  productosRelacionados: number;
  fechaCreacion: Date;
  activa: boolean;
}

@Component({
  selector: 'app-regiter-catalogo-modal',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, BtnAcceptComponent, BtnCloseComponent],
  templateUrl: './regiter-catalogo-modal.component.html',
  styleUrl: './regiter-catalogo-modal.component.scss'
})
export class RegiterCatalogoModalComponent {
  constructor(public _matDialogRef: MatDialogRef<RegiterCatalogoModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onCloseModal() {
    this._matDialogRef.close();
  }

  onSubmit() {
    this._matDialogRef.close();
  }

  categorias: CategoriaProducto[] = [
    {
      id: 1,
      nombre: "Herramientas Manuales",
      descripcion: "Herramientas que se utilizan con la mano, como martillos, llaves, destornilladores, etc.",
      productosRelacionados: 120,
      fechaCreacion: new Date("2022-01-15"),
      activa: true,
    },
    {
      id: 2,
      nombre: "Materiales de Construcción",
      descripcion: "Cemento, ladrillos, arena y otros materiales de construcción.",
      productosRelacionados: 85,
      fechaCreacion: new Date("2021-10-30"),
      activa: true,
    },
    {
      id: 3,
      nombre: "Pinturas y Acabados",
      descripcion: "Pinturas, esmaltes y productos para acabados decorativos.",
      productosRelacionados: 60,
      fechaCreacion: new Date("2021-05-12"),
      activa: false,
    },
    {
      id: 4,
      nombre: "Herramientas Eléctricas",
      descripcion: "Taladros, sierras eléctricas, amoladoras, y otras herramientas que requieren electricidad.",
      productosRelacionados: 45,
      fechaCreacion: new Date("2020-11-25"),
      activa: true,
    },
    {
      id: 5,
      nombre: "Tuberías y Accesorios",
      descripcion: "Tuberías de PVC, cobre, y accesorios para plomería.",
      productosRelacionados: 75,
      fechaCreacion: new Date("2022-06-08"),
      activa: true,
    }
  ];

}
