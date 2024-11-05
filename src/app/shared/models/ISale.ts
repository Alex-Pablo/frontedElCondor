export interface SaleDto {
  id: string;              // Identificador único de la venta
  total: number;          // Total de la venta
  iD_User: number;        // ID del usuario que realizó la venta
  saleDate: string;       // Fecha de la venta (en formato ISO)
  productsTotal: number;  // Total de productos en la venta
}

export interface SaleHistoryDto {
  id: string;             // Identificador único de la venta
  totalAmount: number;    // Total de la venta
  date: string;           // Fecha de la venta
  // Agrega otros campos según sea necesario
}

export interface ApiResponse {
  isSuccess: boolean;     // Indica si la operación fue exitosa
  value: SaleDto[];      // Lista de ventas o detalles de una venta
  error: string | null;   // Mensaje de error si la operación falla
}