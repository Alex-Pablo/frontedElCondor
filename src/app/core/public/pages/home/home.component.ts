import { Component } from '@angular/core';
import { ICategorias } from '../../../../shared/models/Icategorias';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  NombreEmpresa: string = 'EL CONDOR';
  imageUrl: string = 'img/Cuchara.jpg';
  Titulo: string = 'Cuchara para albañil.';
  Precio: string = 'Q23';
  Disponible: number = 34;
  Codigo: string = '#323435';

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


  getProducts(id: number) {
    console.log(id);

  }
}


