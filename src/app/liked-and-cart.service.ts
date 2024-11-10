import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikedAndCartService {

  liked:any = 0;
  likedArr:any = [];
  likedBool:any = [];

  carted:any = 0;
  cartArr:any = [];
  cartBool:any = [];

  constructor() { }
}
