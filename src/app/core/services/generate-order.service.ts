import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  generateOrderDocument(order: any) {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text('Detalles del Pedido', 10, 10);
    doc.text(`ID del Pedido: ${order.supplierId}`, 10, 20);
    doc.text(`Estado: ${order.status}`, 10, 30);

    // Añadir detalles de los productos
    doc.text('Productos:', 10, 40);
    
    let y = 50; // Y position for product details
    order.products.forEach((product: any) => {
      doc.text(`- Producto: ${product.name}`, 10, y);
      doc.text(`  Cantidad: ${product.quantity}`, 10, y + 10);
      doc.text(`  Precio: $${product.price}`, 10, y + 20);
      y += 30; // Incrementar la posición Y para el siguiente producto
    });

    // Guardar el PDF
    doc.save(`pedido-${order.supplierId}.pdf`);
  }
}