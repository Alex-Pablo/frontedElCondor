import { Component, inject, OnInit } from '@angular/core';
import { TitleService } from '../../../../core/services/title.service';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [InputSearchComponent, MatIcon, MatTableModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  sTitle = inject(TitleService)
  searchMessage = "Buscar producto"
  dataSource: any

  ngOnInit(): void {
    this.sTitle.setTitle('Inventario')
    this.getAllInventory();
  }

  getAllInventory() {
    this.dataSource = [
      {
        code: 'HERR001',
        key: 'CLV01',
        name: 'Martillo',
        category: 'Herramientas',
        quantity: 50,
        minStock: 10,
        maxStock: 100,
        unitCost: 5.99,
        sellingPrice: 9.99,
        supplier: 'Herramientas S.A.',
        status: 'En stock',
        expirationDate: '',
        lastRestocked: '2024-09-01'
      },
      {
        code: 'HERR002',
        key: 'CLV02',
        name: 'Juego de destornilladores',
        category: 'Herramientas',
        quantity: 120,
        minStock: 20,
        maxStock: 200,
        unitCost: 12.50,
        sellingPrice: 19.99,
        supplier: 'FixIt Proveedores',
        status: 'En stock',
        expirationDate: '',
        lastRestocked: '2024-09-10'
      },
      {
        code: 'HERR003',
        key: 'CLV03',
        name: 'Clavos 100 unidades',
        category: 'Ferretería',
        quantity: 300,
        minStock: 50,
        maxStock: 500,
        unitCost: 0.99,
        sellingPrice: 2.50,
        supplier: 'Metales S.A.',
        status: 'En stock',
        expirationDate: '',
        lastRestocked: '2024-08-25'
      },
      {
        code: 'HERR004',
        key: 'CLV04',
        name: 'Taladro',
        category: 'Herramientas eléctricas',
        quantity: 30,
        minStock: 5,
        maxStock: 50,
        unitCost: 45.00,
        sellingPrice: 79.99,
        supplier: 'PowerTools Co.',
        status: 'En stock',
        expirationDate: '',
        lastRestocked: '2024-09-05'
      },
      {
        code: 'HERR005',
        key: 'CLV05',
        name: 'Cinta métrica 5m',
        category: 'Medición',
        quantity: 80,
        minStock: 15,
        maxStock: 150,
        unitCost: 3.50,
        sellingPrice: 5.99,
        supplier: 'Mediciones S.A.',
        status: 'En stock',
        expirationDate: '',
        lastRestocked: '2024-09-12'
      }
    ];
  }

  onSearch(id: any) {

  }

  onOpenModal() {

  }

  onEdit(id: any) {

  }
  onDelete(id: any) {

  }
  displayedColumns: string[] = [
    'code',
    'key',
    'name',
    'category',
    'quantity',
    'minStock',
    'unitCost',
    'sellingPrice',
    'supplier',
    'status',
    'expirationDate',
    'lastRestocked',
    'acciones'
  ];
}
