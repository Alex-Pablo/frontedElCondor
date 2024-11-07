import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInventoryReportDto } from '../../shared/models/IInventoryReport';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // private apiUrl = 'https://localhost:7059/api/Product/report';

  apiUrl: string = environment.baseUrlApi;

  constructor(private http: HttpClient) { }

  getInventoryReport(): Observable<IInventoryReportDto[]> {
    return this.http.get<IInventoryReportDto[]>(`${this.apiUrl}/Product/report`); // Cambiado a IInventoryReportDto[] directamente
  }
}
