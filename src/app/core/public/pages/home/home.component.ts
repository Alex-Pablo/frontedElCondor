import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  NombreEmpresa: string = 'EL CONDOR';
  Descripcion: string = 'Todo lo que necesitas para construir tus sueños, con herramientas de confianza de la mas alta calidad.';
  Boton: string ='Ver productos';
  Subtitulo: string = 'Lista de productos'
  Categoria: string = 'Categorias';
  Cat1: string = 'Todas';
  Cat2: string = 'Carpintería';
  Cat3: string = 'Albañilería';
  Cat4: string = 'Categoría X';
  Cat5: string = 'Categoría R';
  imageUrl: string = 'img/Cuchara.jpg';
  Titulo: string = 'Cuchara para albañil.';
  Precio: string = 'Q23';
  Disponible: number = 34;
  Codigo: string = '#323435';
}


