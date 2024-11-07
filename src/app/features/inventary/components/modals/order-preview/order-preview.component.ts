import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../../../../../core/services/generate-order.service';
import { IEnterprise } from '../../../../../shared/models/IEnterprise';
import { EnterpriseService } from '../../../../../core/services/enterprise.service';

@Component({
    selector: 'app-order-preview',
    standalone: true,
    templateUrl: './order-preview.component.html',
    styleUrls: ['./order-preview.component.scss'],
    imports: [
        CommonModule,
        MatDialogModule
    ]
})
export class OrderPreviewComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<OrderPreviewComponent>,
        private documentService: DocumentService,
        private enterpriseService: EnterpriseService
    ) { }

    enterpriseInfor: IEnterprise | undefined;
    logocondor: string = '/img/logo.png';
    private apiUrl = 'https://localhost:7059/api/Enterprise/detail/';

    ngOnInit(): void {
        // Obtener información de la empresa con ID 1
        this.enterpriseService.getEnterpriseById(1).subscribe((data) => {
            if (data.isSuccess) {
                this.enterpriseInfor = data.value; // Accede a data.value
                console.log('Datos de la empresa:', this.enterpriseInfor);
            } else {
                console.error('Error al obtener datos de la empresa:', data.error);
            }
        });
    }

    confirmOrder() {
        const content = document.getElementById('pdfContent');
        if (content) { // Verifica si content no es null
            this.documentService.generateOrderDocument(content, this.data.id).then(() => {
                this.dialogRef.close(true); // Cierra el diálogo y devuelve true
            });
        } else {
            console.error('pdfContent no encontrado');
        }
    }

    cancel() {
        this.dialogRef.close(false); // Cierra el diálogo y retorna false
    }
}