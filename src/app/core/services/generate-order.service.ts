import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  async generateOrderDocument(content: HTMLElement, orderId: string) {
    
    const imgData = await this.captureContent(content);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190; // Ancho del PDF
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (content.offsetHeight * imgWidth) / content.offsetWidth;
    let heightLeft = imgHeight;

    let position = 0;

    // Agregar la primera imagen
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Manejar el caso de que la imagen sea más alta que una página
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Guardar el PDF con el orderId en el nombre
    pdf.save(`pedido-${orderId}.pdf`); // Nombre del archivo ahora incluye orderId
  }

  private async captureContent(content: HTMLElement): Promise<string> {
    const canvas = await html2canvas(content);
    return canvas.toDataURL('image/png');
  }
}