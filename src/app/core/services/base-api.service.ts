import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IResult } from '../../shared/models/IResult';
import { map, Observable } from 'rxjs';
import { NumberInput } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  baseApi: string = environment.baseUrlApi;

  constructor(private http: HttpClient) { }

  getItems(service: any) {
    return this.http.get<any>(`${environment.baseUrlApi}/${service}/getAll`);
  }

  getItemBy(service: any, id: any) {
    return this.http.get<any>(`${environment.baseUrlApi}/${service}/get/${id}`)
  }

  addItem(service: any, data: any) {
    return this.http.post<any>(`${environment.baseUrlApi}/${service}/register`, data);
  }

  closeCashSession(data: any) {
    console.log(data)
    return this.http.post<any>(`${environment.baseUrlApi}/cashSession/close`, data);
  }

  updateItem(service: any, data: any, id: number) {
    return this.http.put<any>(`${environment.baseUrlApi}/${service}/modify/${id}`, data)
  }

  removeItem(service: any, id: number) {
    return this.http.delete<any>(`${environment.baseUrlApi}/${service}/delete/${id}`)
  }

  getDetail(service: string, id: any): Observable<IResult<any>> {
    return this.http.get<IResult<any>>(`${environment.baseUrlApi}/${service}/detail/${id}`)
  }

  getItemsById(service: string, id: number) {
    return this.http.get<any>(`${environment.baseUrlApi}/${service}/${id}`)
  }

  receiveItems(id: any) {
    return this.http.get<any>(`${environment.baseUrlApi}/order/recieve/${id}`)
  }


  getItemsPagination(service: string, pageIndex: number, pageSize: number) {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${environment.baseUrlApi}/${service}`, { params, observe: 'response' })
      .pipe(
        map(response => {
          console.log('HTTP Status Code:', response.status);  // Esto mostrará el código de estado
          console.log(response);

          const paginationHeader = response.headers.get('X-Pagination') || response.headers.get('x-pagination');
          if (!paginationHeader) {
            console.warn('X-Pagination header not found');
          }

          const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
          return {
            items: response.body || [],
            pagination
          };
        })
      );
  }


  filter(service: string, numberDTE?: string | null, startDate?: Date | null, endDate?: Date | null) {
    let params = new HttpParams();

    if (numberDTE) {
      params = params.append('numberDTE', numberDTE);
    }
    if (startDate) {
      params = params.append('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.append('endDate', endDate.toISOString());
    }

    console.log(params)
    return this.http.get<any>(`${this.baseApi}/${service}/filter`, { params });
  }
}
