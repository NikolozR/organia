import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  constructor(private http:HttpClient) { 
  }


  GetData(){
    return this.http.get('/assets/server/homePage.json');
  }

  GetProdData(){
    return this.http.get('/assets/server/products.json')
  }

  GetSmallData(){
    return this.http.get('/assets/server/smallFIlter.json');
  }

  GetOfferData(){
    return this.http.get('/assets/server/specialOffers.json')
  }

  GetWorkersData(){
    return this.http.get('/assets/server/workers.json')
  }

}
