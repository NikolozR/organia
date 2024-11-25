import { Component, OnInit } from '@angular/core';
import { LikedAndCartService } from './liked-and-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finalProject';

  constructor(public like: LikedAndCartService) { }

  ngOnInit(): void {
    let onLoadStorageLikes:any = localStorage.getItem("liked")
    JSON.parse(onLoadStorageLikes)?.forEach((el:any) => {
      this.like.likedArr.push(el)
    })
    this.like.liked = JSON.parse(onLoadStorageLikes)?.length;
    JSON.parse(onLoadStorageLikes)?.forEach((el:any) => {
      this.like.likedBool[el] = true;
    })

    let onLoadStorageCart:any = localStorage.getItem("cart");
    JSON.parse(onLoadStorageCart)?.forEach((el:any) => {
      this.like.cartArr.push(el)
    })
    this.like.carted = JSON.parse(onLoadStorageCart)?.length;
    JSON.parse(onLoadStorageCart)?.forEach((el:any) => {
      this.like.cartBool[el.id] = true;
    })


    
  }

}
