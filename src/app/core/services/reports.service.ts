import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, retry } from 'rxjs';
import { IResult } from '../../shared/models/IResult';
import { IUserReportsDto } from '../../shared/models/IUserReports';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  // baseApi: string = environment.baseUrlApi;
  constructor(private http: HttpClient, private localStorageS: LocalStorageService) { }


  getUserReports(): Observable<IResult<IUserReportsDto[]>> {
    return this.http.get<IResult<IUserReportsDto[]>>(`${environment.baseUrlApi}/UserReports`)
  }
}
