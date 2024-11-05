export interface IInventoryReportDto {
    id: number;                  // ID del producto
    name: string;               // Nombre del producto
    code: string;               // Código del producto
    description: string;        // Descripción del producto
    purchasePrice: number;      // Precio de compra
    salePrice: number;          // Precio de venta
    stock: number;              // Cantidad en stock
    status: string;             // Estado del producto (por ejemplo, "activo", "inactivo")
    category?: string;          // Categoría del producto (opcional)
    supplier?: string;          // Proveedor del producto (opcional)
    unidOfMeasure?: string;     // Unidad de medida (opcional)
    created_at: Date;           // Fecha de creación
    updated_at?: Date;          // Fecha de la última actualización (opcional)
  }

  export interface ApiResponse<T> {
    isSuccess: boolean;
    value?: T;
    error?: string;
  }