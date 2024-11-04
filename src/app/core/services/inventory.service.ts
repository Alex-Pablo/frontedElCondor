import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInventoryReportDto } from '../../shared/models/IInventoryReport';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://localhost:7059/api/Product/report';

  constructor(private http: HttpClient) {}

  getInventoryReport(): Observable<IInventoryReportDto[]> {
    return this.http.get<IInventoryReportDto[]>(this.apiUrl); // Cambiado a IInventoryReportDto[] directamente
  }
}