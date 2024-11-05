import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrderDto } from '../../shared/models/IOrder'; // Asegúrate de que esta interfaz exista
import { ApiResponse } from '../../shared/models/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderReportService {
  private apiUrl = 'https://localhost:7059/api/Order/getAll'; // Ajusta esta URL según tu API

  constructor(private http: HttpClient) {}

  getOrderReport(): Observable<ApiResponse<IOrderDto[]>> {
    return this.http.get<ApiResponse<IOrderDto[]>>(this.apiUrl);
  }
}
