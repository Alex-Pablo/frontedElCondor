import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../../environments/environment'
import { IResult } from '../../shared/models/IResult';
import { IUser } from '../../shared/models/IUser';
import { IRole } from '../../shared/models/IRole';
import { IUserStatus } from '../../shared/models/IUserStatus';
import { IUserDetailDto } from '../../shared/models/IUserDetail';
import { IUserModifyDto } from '../../shared/models/IUserModify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurlApi: string = 'https://localhost:7059/api';

  constructor(private http: HttpClient, private localStorageS: LocalStorageService) { }


  login(email: string, password: string): Observable<IResult<string>> {
    return this.http.post<IResult<string>>(`${this.baseurlApi}/User/login`, { Email: email, Password: password })
      .pipe(
        tap(
          response => {

            if (response && response.isSuccess) {

              const token = response.value;
              this.localStorageS.set('currentuser', JSON.stringify((token)));
            }
          }
        )
      )
  }

  register(formData: any): Observable<IResult<boolean>> {
    return this.http.post<IResult<boolean>>(`${environment.baseUrlApi}/User/register`, formData)
  }

  logout() {

  }

  getProfile() {
    return this.http.get<IResult<IUser>>(`${environment.baseUrlApi}/User/perfil`);
  }


  getRoles() {
    return this.http.get<IResult<IRole[]>>(`${environment.baseUrlApi}/Role/getAll`);
  }

  getUserStatus() {
    return this.http.get<IResult<IUserStatus[]>>(`${environment.baseUrlApi}/UserStatus/getAll`)
  }

  getUsers() {
    return this.http.get<IResult<IUser[]>>(`${environment.baseUrlApi}/User/getAll`);
  }

  getUserDetail(id: number) {
    return this.http.get<IResult<IUserDetailDto>>(`${environment.baseUrlApi}/User/detail/${id}`);
  }

  getUserById(id: number) {
    return this.http.get<IResult<IUserModifyDto>>(`${environment.baseUrlApi}/User/User/${id}`)
  }
}
