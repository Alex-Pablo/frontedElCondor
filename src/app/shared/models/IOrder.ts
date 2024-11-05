// IOrder.ts
export interface IOrderDto {
    id: number;
    supplier: string;
    supplierContact: string;
    productsTotal: number;
    priceTotal: number;
    status: string;
    timeOrder: Date;
}