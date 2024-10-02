import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class JWTTokenService {

  jwtToken: string | null = null;
  decodedToken?: { [key: string]: any };

  constructor() { }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return this.jwtToken ? jwtDecode(this.jwtToken) : null;
  }

  getId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['nameid'] : null;
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['displayname'] : null;
  }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
