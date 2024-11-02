/*import { Component } from '@angular/core';

@Component({
  selector: 'app-historial-detail-popup',
  standalone: true,
  imports: [],
  templateUrl: './historial-detail-popup.component.html',
  styleUrl: './historial-detail-popup.component.scss'
})
export class HistorialDetailPopupComponent {

}*/
// Importa MAT_DIALOG_DATA y injecta en el constructor
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-historial-detail-popup',
  standalone: true,
  imports: [],
  templateUrl: './historial-detail-popup.component.html',
  styleUrl: './historial-detail-popup.component.scss'
})
export class HistorialDetailPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}




