import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputFieldComponent } from '../../../../../shared/components/input-field/input-field.component';
import { InputSearchComponent } from '../../../../../shared/components/input-search/input-search.component';
import { BtnCloseComponent } from '../../../../../shared/components/btn-close/btn-close.component';
import { BtnAcceptComponent } from '../../../../../shared/components/btn-accept/btn-accept.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-created-order',
  standalone: true,
  imports: [MatDialogModule, InputFieldComponent, BtnCloseComponent, BtnAcceptComponent, InputSearchComponent, NgFor],
  templateUrl: './created-order.component.html',
  styleUrl: './created-order.component.scss'
})
export class CreatedOrderComponent {
  constructor(public _matDialogRef: MatDialogRef<CreatedOrderComponent>) { }
  stepTitle = "Selecione un proveedor"
  load1 = false;
  onCloseModal() {
    this._matDialogRef.close();
  }

  onSubmit() {

  }

  supplierSelect() {
    this.stepTitle = "Proveedor selecionado"
    this.load1 = !this.load1
  }


  handleAddProduct() {

  }
  filteredProducts = [
    { id: 1, name: 'Producto A', sku: 'A001', currentStock: 20, unitCost: 100.50 },
    { id: 2, name: 'Producto B', sku: 'B002', currentStock: 0, unitCost: 250.99 },
    { id: 3, name: 'Producto C', sku: 'C003', currentStock: 10, unitCost: 300.75 },
    { id: 1, name: 'Producto A', sku: 'A001', currentStock: 20, unitCost: 100.50 },
    { id: 2, name: 'Producto B', sku: 'B002', currentStock: 0, unitCost: 250.99 },
    { id: 3, name: 'Producto C', sku: 'C003', currentStock: 10, unitCost: 300.75 }
  ];
}
