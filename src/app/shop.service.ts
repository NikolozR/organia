import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  GetCarouselData(){
    return this.http.get('/assets/server/shopCarousel.json')
  }

  GetAllProductData(){
    return this.http.get('/assets/server/shopProducts.json')
  }

  everyProd:any = [];
}
