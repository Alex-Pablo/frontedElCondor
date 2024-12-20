import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleDto, ApiResponse } from '../../shared/models/ISale';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  // private baseUrl = 'https://localhost:7059/api/Sale'; // URL base de la API

  baseUrl: string = environment.baseUrlApi;

  constructor(private http: HttpClient) { }

  // Método para registrar una nueva venta
  registerSale(saleItems: SaleDto[]): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/Sale/register`, saleItems);
  }

  // Método para obtener el historial de ventas con paginación
  getSaleHistory(paginationParams: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/Sale/inventory/history/GetItems`, {
      params: paginationParams
    });
  }

  // Método para obtener detalles de una venta específica
  getSaleDetail(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/Sale/detail/${id}`);
  }

  // Método para filtrar las ventas
  filterSales(numberDTE?: string, startDate?: string, endDate?: string): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('numberDTE', numberDTE || '')
      .set('startDate', startDate || '')
      .set('endDate', endDate || '');

    return this.http.get<ApiResponse>(`${this.baseUrl}/Sale/filter`, { params });
  }
}
