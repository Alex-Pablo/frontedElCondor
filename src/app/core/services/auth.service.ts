import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurlApi: string = 'https://localhost:7059/api';

  constructor( private http: HttpClient) { }


  login(email: string, password:string){
    return this.http.post<any>(`https://localhost:7059/api/User/login`, {Email:email, Password:password})
  }
}
