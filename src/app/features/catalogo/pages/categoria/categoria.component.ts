import { Component, inject, OnInit } from '@angular/core';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TitleService } from '../../../../core/services/title.service';
import { RegisterCategoriaComponent } from '../../components/modals/register-categoria/register-categoria.component';
import { MatTableModule } from '@angular/material/table';


export interface Categoria {
  nombre: string;
  descripcion: string;
  estado: string; // 'Activo' o 'Inactivo'
  cantidadProductos: number;
}

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [InputSearchComponent, MatIcon, RegisterCategoriaComponent, MatTableModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'cantidadProductos', 'acciones'];
  sTitle = inject(TitleService)
  _matDialog = inject(MatDialog)
  searchMessage = "Buscar proveedor"
  dataSource: any;

  onOpenModal() {
  }

  onSearch(id: any) {
  }

  ngOnInit(): void {
    this.sTitle.setTitle('Categorias de productos')
    this.getAllCategoria();
  }


  onEdit(id: any) {
  }

  onDelete(id: any) {
  }

  onViewDetails(id: any) {
  }


  getAllCategoria() {
    this.dataSource = [
      { nombre: 'Herramientas Manuales', descripcion: 'Incluye martillos, destornilladores y más.', estado: 'Activo', cantidadProductos: 150 },
      { nombre: 'Herramientas Eléctricas', descripcion: 'Taladros, sierras eléctricas y herramientas eléctricas.', estado: 'Activo', cantidadProductos: 80 },
      { nombre: 'Materiales de Construcción', descripcion: 'Cemento, ladrillos y otros materiales.', estado: 'Activo', cantidadProductos: 200 },
      { nombre: 'Fontanería', descripcion: 'Tuberías, grifos y accesorios de fontanería.', estado: 'Inactivo', cantidadProductos: 50 },
      { nombre: 'Electricidad', descripcion: 'Cables, enchufes y productos eléctricos.', estado: 'Activo', cantidadProductos: 120 },
      { nombre: 'Jardinería', descripcion: 'Herramientas y productos para el cuidado del jardín.', estado: 'Activo', cantidadProductos: 90 },
      { nombre: 'Seguridad', descripcion: 'Candados, alarmas y sistemas de seguridad.', estado: 'Activo', cantidadProductos: 30 },
      { nombre: 'Pintura y Acabados', descripcion: 'Pinturas, brochas y productos para acabados.', estado: 'Activo', cantidadProductos: 60 },
      { nombre: 'Accesorios para Automóviles', descripcion: 'Herramientas y productos para el mantenimiento de vehículos.', estado: 'Inactivo', cantidadProductos: 15 },
      { nombre: 'Productos de Limpieza', descripcion: 'Productos químicos y herramientas de limpieza.', estado: 'Activo', cantidadProductos: 100 },
    ];
  }
}
