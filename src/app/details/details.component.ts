import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { LikedAndCartService } from '../liked-and-cart.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private service:ShopService, private cart:LikedAndCartService) { }
  everyProd:any = [];
  chosen:any = [];
  stars:any = [false, false, false, false, false];
  isOnCart:boolean = this.cart.cartBool[this.route.snapshot.params['id']];
  quantity:number = 0;
  ifNotOnCart = {
    id: this.route.snapshot.params['id'],
    count: 0
  }

  counting(){
      let qunt = this.cart.cartArr.find((el:any) => {
        return el.id == this.route.snapshot.params['id'];
      })
      this.quantity = qunt.count;
  }

  minus(){
    this.ifNotOnCart.count--;
      this.quantity = this.ifNotOnCart.count;
  }

  plus(){
      this.ifNotOnCart.count++;
      this.quantity = this.ifNotOnCart.count;
  }


  addCart(){
    this.cart.cartArr.push(this.ifNotOnCart);
    this.cart.cartBool[this.route.snapshot.params['id']] = true;
    let forJSON = JSON.stringify(this.cart.cartArr);
    localStorage.setItem('cart', forJSON);
    this.isOnCart = this.cart.cartBool[this.route.snapshot.params['id']];
    this.cart.carted = this.cart.cartArr.length;
  }


  ngOnInit(): void {
    this.service.GetAllProductData().subscribe((p:any) => {
      this.everyProd = p;
      let id = this.route.snapshot.params['id'];
      this.chosen = this.everyProd.find((el:any) => {
        return el.id == id;
      })
      for (let i = 0; i < this.chosen.stars; i++) {
        this.stars[i] = true;
      }
    })
  }

}
