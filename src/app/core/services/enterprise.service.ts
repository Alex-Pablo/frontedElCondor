import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEnterprise } from '../../shared/models/IEnterprise';
import { ApiResponse } from '../../shared/models/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private apiUrl = 'https://localhost:7059/api/Enterprise/detail/'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) { }

  getEnterpriseById(id: number): Observable<ApiResponse<IEnterprise>> {
    return this.http.get<ApiResponse<IEnterprise>>(`${this.apiUrl}${id}`);
  }
}
