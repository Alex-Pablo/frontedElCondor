import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../../environments/environment'
import { IResult } from '../../shared/models/IResult';
import { IUser } from '../../shared/models/IUser';

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

  register(formData: any) {
    console.log(formData);

    return this.http.post<any>(`${environment.baseUrlApi}/User/register`, formData)
  }


  logout() {

  }

  getProfile() {
    return this.http.get<IResult<IUser>>(`${environment.baseUrlApi}/User/perfil`);
  }
}
