import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  set(key: string, value:string){
    localStorage.setItem(key, value);
  }

  get(key: string){
    return localStorage.getItem(key);
  }

  remoe(key: string){
    localStorage.removeItem(key)
  }
}
