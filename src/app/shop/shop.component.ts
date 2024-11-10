import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { LikedAndCartService } from '../liked-and-cart.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private service:ShopService, public like: LikedAndCartService) { }

  shownNumber = 9;
  carouselData:any = [];
  leftOver:number = 0;
  pageNumber:number = 0;
  everyProduct:any = [];
  starsAndSale:any = [];
  prodIsShown:any = [];
  pages:any = [];
  carouselBoos:any = [];
  rightAllowed:boolean = false;
  leftAllowed:boolean = false;

  // methods for shop top carousel
  arrowCheck(){
    if (this.carouselBoos.indexOf(true) != (this.carouselBoos.length - 1)) {
      this.rightAllowed = true;
    }else{
      this.rightAllowed = false;
    }
    if(this.carouselBoos.indexOf(true) != 0){
      this.leftAllowed = true;
    }else{
      this.leftAllowed = false;
    }
  }
  stepRight(){
    let x = this.carouselBoos.indexOf(true);
    for (let i = 0; i < this.carouselBoos.length; i++) {
      this.carouselBoos[i] = false;
    }
    console.log(this.carouselBoos)
    this.carouselBoos[x + 1] = true;
    this.arrowCheck();
  }
  stepLeft(){
    let x = this.carouselBoos.indexOf(true);
    for (let i = 0; i < this.carouselBoos.length; i++) {
      this.carouselBoos[i] = false;
    }
    this.carouselBoos[x - 1] = true;
    this.arrowCheck();
  }
  //////////////////////////////



  // methods for products big carousel
  chosenShownProds(){
    for (let i = 0; i < this.everyProduct.length; i++) {
      this.prodIsShown[i] = false;
    }
    for (let i = 0; i < this.prodIsShown.length; i++) {
      if (this.pages.indexOf(true) == 0){
        if(i >= 0 && i < this.shownNumber){
          this.prodIsShown[i] = true;
        }
      }else{
        if (i >= (this.shownNumber * this.pages.indexOf(true)) && i < (this.shownNumber * this.pages.indexOf(true) + this.shownNumber)) {
          this.prodIsShown[i] = true;
        }
      }
    }
  }
  buttonClicked(p:any){
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i] = false;
    }
    this.pages[p.path[0].id] = true;
    this.chosenShownProds();
    console.log(this.prodIsShown)
  }
  leftPage(){
    let x = this.pages.indexOf(true);
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i] = false;
    }
    this.pages[x - 1] = true;
    this.chosenShownProds();
  }
  rightPage(){
    let x = this.pages.indexOf(true);
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i] = false;
    }
    this.pages[x + 1] = true;
    this.chosenShownProds();
  }
  ////////////////////////////////
  

  // adding to like list
  shopLike(p:any){
      let id = p.path[0].id;
    if (id == '') {
      id = p.path[1].id
    }
    if (!this.like.likedArr.includes(id)) {
      this.like.likedArr.push(id)
      this.like.likedBool[id] = true;
    }else{
      let t = this.like.likedArr.indexOf(id);
      this.like.likedBool[id] = false;
      this.like.likedArr.splice(t, 1)
      console.log(t)
    }
    let forStorage = JSON.stringify(this.like.likedArr)
    localStorage.setItem("liked", forStorage);
    let outStorage:any = localStorage.getItem("liked")
    this.like.liked = JSON.parse(outStorage).length;
    console.log(localStorage.getItem("liked"))
  }


  // adding to cart
  addCart(p:any){
    if (!this.like.cartBool[p]) {
      let obj = {
        "id": p,
        "count": 1
      }
      this.like.cartArr.push(obj);
      this.like.cartBool[p] = true;
      let forStorage:any = JSON.stringify(this.like.cartArr);
      localStorage.setItem("cart", forStorage);
    }else{
      this.like.cartArr.forEach((el:any) => {
        if (el.id == p){
          el.count++;
        }
      })
      let forJSON = JSON.stringify(this.like.cartArr);
      localStorage.setItem("cart", forJSON)
    }
    this.like.carted = this.like.cartArr.length;
  }



  ngOnInit(): void {
    
    

    // REQUEST FOR SHOP CAROUSEL!!!!!!!!
    this.service.GetCarouselData().subscribe((p) => {
      this.carouselData = p;
      this.carouselData.forEach((el:any) => {
        this.carouselBoos.push(false);
      });
      this.carouselBoos[0] = true;
      if (this.carouselBoos.indexOf(true) != (this.carouselBoos.length - 1)) {
        this.rightAllowed = true;
      }
    })



    // REQUEST FOR EVERY PRODUCT !!!!!!!!
    this.service.GetAllProductData().subscribe((p) => {
      this.everyProduct = p;
      this.service.everyProd = p;

      this.everyProduct.forEach((el:any) => {
        let isSale:any = '';
        let percent:number = 0;
        if (el.price != el.salesPrice) {
            isSale = true;
        }else{
            isSale = false;
        }
        if (isSale) {
          percent = Math.floor(((el.price - el.salesPrice) / el.price) * 100);
        } else {
          percent = 0;
        }
        this.starsAndSale.push({
          stars: [false, false, false, false, false],
          isSale: isSale,
          percent: percent
        })
      });

      this.everyProduct.forEach((el:any) => {
        let x = el.stars;
        let id = el.id;
        for (let i = 0; i < x; i++) {
          this.starsAndSale[id].stars[i] = true;
        }
      })

      this.everyProduct.forEach((el:any) => {
          this.like.likedBool.push(false);
      });
      this.everyProduct.forEach((el:any) => {
        this.like.cartBool.push(false);
      })

      
      this.leftOver = this.everyProduct.length % this.shownNumber;
      this.pageNumber = ((this.everyProduct.length - this.leftOver) / this.shownNumber) + 1;
      for (let i = 0; i < this.pageNumber; i++){
        this.pages.push(false)
      }
      this.pages[0] = true;
      for (let i = 0; i < this.everyProduct.length; i++) {
        this.prodIsShown.push(false);
      }
      for (let i = 0; i < this.prodIsShown.length; i++) {
        if (this.pages.indexOf(true) == 0){
          if(i >= 0 && i < this.shownNumber){
            this.prodIsShown[i] = true;
          }
        }
      }
    })
  }
}
