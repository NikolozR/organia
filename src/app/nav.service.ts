import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private http:HttpClient) { }

  GetData(){
    return this.http.get('/assets/server/navbar.json');
  }
}
