import { Component, OnInit } from '@angular/core';
import { LikedAndCartService } from '../liked-and-cart.service';
import { ShopService } from '../shop.service';
import { FooterService } from '../footer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cart:LikedAndCartService, private service:ShopService, private router: Router,
    private route: ActivatedRoute,
    private scroller: ViewportScroller) { }
  chosenOnes:any = [];
  counts:any = [];


  minus(p:any){
    let clicked = this.cart.cartArr.find((el:any) => {
      return el.id == p;
    });
    if (clicked.count > 1) {
      let clickedIndex = this.cart.cartArr.indexOf(clicked);
      clicked.count--;
      this.cart.cartArr[clickedIndex] = clicked;
      let forLocal = JSON.stringify(this.cart.cartArr);
      localStorage.setItem("cart", forLocal);
      this.cart.cartArr.forEach((el:any) => {
        this.counts[el.id] = el.count;
      })
    }
  }

  plus(p:any){
    let clicked = this.cart.cartArr.find((el:any) => {
      return el.id == p;
    });
    let clickedIndex = this.cart.cartArr.indexOf(clicked);
    clicked.count++;
    this.cart.cartArr[clickedIndex] = clicked;
    let forLocal = JSON.stringify(this.cart.cartArr);
    localStorage.setItem("cart", forLocal);
    this.cart.cartArr.forEach((el:any) => {
      this.counts[el.id] = el.count;
    })
  }


  cancel(p:any){
    let clicked = this.cart.cartArr.find((el:any) => {
      return el.id == p;
    });
    let clickedIndex = this.cart.cartArr.indexOf(clicked);
    this.cart.cartArr.splice(clickedIndex, 1);
    this.cart.cartBool[p] = false;
    this.cart.carted = this.cart.cartArr.length;
    this.counts[p] = 0;
    this.chosenOnes = [];
    this.service.GetAllProductData().subscribe((t:any) => {
      t.forEach((el:any) => {
        if (this.cart.cartBool[el.id]) {
          this.chosenOnes.push(el)
        }
      })
    })
    localStorage.setItem('cart', JSON.stringify(this.cart.cartArr))
  }


  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event.constructor.name === 'NavigationEnd') {
        const fragment = this.route.snapshot.fragment;
        if (fragment === 'cart') {
          this.scroller.scrollToAnchor('cart');
        }
      }
    });
    this.service.GetAllProductData().subscribe((p:any) => {
      p.forEach((el:any) => {
        if (this.cart.cartBool[el.id]) {
          this.chosenOnes.push(el)
        }
      })

      for (let i = 0; i < p.length; i++) {
        this.counts.push(0);
      }
      this.cart.cartArr.forEach((el:any) => {
        this.counts[el.id] = el.count;
      })
    })
  }

}
