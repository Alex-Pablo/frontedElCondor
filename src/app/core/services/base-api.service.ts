import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  baseApi: string = environment.baseUrlApi;

  constructor(private http: HttpClient) { }

  getItems(service: any) {
    return this.http.get<any>(`${environment.baseUrlApi}/${service}/getAll`);
  }

  getItemBy(service: any) {

  }

  addItem(service: any, data: any) {
    return this.http.post<any>(`${environment.baseUrlApi}/${service}/register`, data);
  }


  updateItem(service: any, data: any, id: number) {
    return this.http.put<any>(`${environment.baseUrlApi}/${service}/modify/${id}`, data)
  }

  removeItem(service: any, id: number) {
    return this.http.delete<any>(`${environment.baseUrlApi}/${service}/delete/${id}`)
  }

}
