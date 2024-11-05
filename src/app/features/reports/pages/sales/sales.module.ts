import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@NgModule({
    imports: [
        CommonModule,
        FormsModule, // Asegúrate de incluir esto
        MatTableModule,
        MatIconModule,
    ],
})
export class SalesModule { }