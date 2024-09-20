import { Component, inject, OnInit } from '@angular/core';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { TitleService } from '../../../../core/services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RegisterProveedorComponent } from '../../components/modals/register-proveedor/register-proveedor.component';

export interface Proveedor {
  nombre: string;
  nit: string;
  contacto: string;
  correo: string;
  telefono: string;
  estado: string;
}
@Component({
  selector: 'app-proveedore',
  standalone: true,
  imports: [InputSearchComponent, RegisterProveedorComponent, MatIconModule, MatTableModule],
  templateUrl: './proveedore.component.html',
  styleUrl: './proveedore.component.scss'
})
export class ProveedoreComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'nit', 'contacto', 'correo', 'telefono', 'estado', 'acciones'];
  sTitle = inject(TitleService)
  _matDialog = inject(MatDialog)
  searchMessage = "Buscar proveedor"
  dataSource: any;
  onSearch(event: any) {
  }

  ngOnInit(): void {
    this.getAllProveedores()
  }

  onOpenModal() {
    this._matDialog.open(RegisterProveedorComponent, {
      height: '80vh',
      width: '70vw',
      maxWidth: '70vw',
      disableClose: true
    }).afterClosed().subscribe(() => {
      this.getAllProveedores();
    })
  }

  onDelete(id: any) {

  }

  onEdit(id: any) {

  }

  onViewDetails(id: any) {

  }


  getAllProveedores() {
    this.dataSource = [
      { nombre: 'Ferretería El Tornillo', nit: '1234567-8', contacto: 'Carlos Pérez', correo: 'carlos@eltornillo.com', telefono: '5555-1234', estado: 'Activo' },
      { nombre: 'Materiales y Más', nit: '8765432-1', contacto: 'María López', correo: 'maria@materialesymas.com', telefono: '5555-5678', estado: 'Inactivo' },
      { nombre: 'Construrama', nit: '2345678-9', contacto: 'Juan González', correo: 'juan@construrama.com', telefono: '5555-8765', estado: 'Activo' },
      { nombre: 'Ferretería San José', nit: '3456789-0', contacto: 'Ana Martínez', correo: 'ana@fersanjose.com', telefono: '5555-6543', estado: 'Inactivo' },
      { nombre: 'El Constructor', nit: '4567890-1', contacto: 'Luis Rodríguez', correo: 'luis@elconstructor.com', telefono: '5555-4321', estado: 'Activo' },
    ];
  }
}
