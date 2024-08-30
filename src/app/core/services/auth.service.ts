import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JWTTokenService } from './jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurlApi: string = 'https://localhost:7059/api';

  constructor( private http: HttpClient, private localStorageS: LocalStorageService) { }


  login(email: string, password:string){
    return this.http.post<any>(`${this.baseurlApi}/User/login`, {Email:email, Password:password})
      .pipe(
        tap(
          response => {
            if (response && response.user){
              const token = response.user;

              this.localStorageS.set('currentuser', JSON.stringify((token)));
            }
          }
        )
      )
  }
}
