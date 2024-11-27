import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { HomeService } from '../home.service'
import { ShopService } from '../shop.service';
import { LikedAndCartService } from '../liked-and-cart.service';
// import Swiper core and required modules


// install Swiper modules



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  constructor(private homeService: HomeService, public like: LikedAndCartService, private service:ShopService, private router: Router,
    private route: ActivatedRoute,
    private scroller: ViewportScroller) { }


  products:any = [];
  myProducts:any = [];
  shownProducts: any = [];
  
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

  homePage: any = [];
  workers:any = [];
  offers:any = [];
  smallFilter:any = [];
  // HEADERS GALLERY LOGIC!!!!!!!!!!!!START
  // HEADERS GALLERY LOGIC!!!!!!!!!!!!START
  // HEADERS GALLERY LOGIC!!!!!!!!!!!!START
  // HEADERS GALLERY LOGIC!!!!!!!!!!!!START
  activebackgroundImg: number = 0;
  headerVars: any = '';
  headerBackGallery: any = '';
  activeBackHeaderURL: any = '';
  headerGallery(parEvent: any) {
    let clickedID = parEvent['srcElement']['attributes']['id'].value;
    this.activebackgroundImg = clickedID;
    this.activeBackHeaderURL = this.headerBackGallery?.find((el: any) => {
      return el.imgID == this.activebackgroundImg;
    })?.imgURL
  }
  // HEADERS GALLERY LOGIC!!!!!!!!!!!!END
  // HEADERS GALLERY LOGIC!!!!!!!!!!!!END
  // HEADERS GALLERY LOGIC!!!!!!!!!!!!END
  // HEADERS GALLERY LOGIC!!!!!!!!!!!!END



  filterCategoryAct:any = [];

  benefits: any = '';



  // new products logic!!!!!!!!!!!!!!!!!START
  // new products logic!!!!!!!!!!!!!!!!!START
  // new products logic!!!!!!!!!!!!!!!!!START
  // new products logic!!!!!!!!!!!!!!!!!START
  newProducts: any = [];
  leng: any = '';
  newProdSales: any = [];
  shownSwiper = [0, 1, 2];
  everyProdSwiper: any = [];

  max(arr: any) {
    return arr.reduce(function (p: any, v: any) {
      return (p > v ? p : v);
    });
  }
  min(arr: any) {
    return arr.reduce(function (p: any, v: any) {
      return (p < v ? p : v);
    });
  }
  shownMax = this.max(this.shownSwiper)
  shownMin = this.min(this.shownSwiper)

  rightFunct() {
    let localMin = this.shownSwiper.indexOf(this.min(this.shownSwiper))
    this.shownSwiper[localMin] = this.max(this.shownSwiper) + 1;
    this.newProducts?.forEach((el: any) => {
      if (this.shownSwiper.includes(el.id)) {
        this.everyProdSwiper[el.id] = true;
      } else {
        this.everyProdSwiper[el.id] = false;
      }
    });
    this.shownMax = this.max(this.shownSwiper)
    this.shownMin = this.min(this.shownSwiper)
  };
  leftFunct() {
    let localMax = this.shownSwiper.indexOf(this.shownMax);
    this.shownSwiper[localMax] = this.min(this.shownSwiper) - 1;
    this.shownMax = this.max(this.shownSwiper)
    this.shownMin = this.min(this.shownSwiper)
    this.newProducts?.forEach((el: any) => {
      if (this.shownSwiper.includes(el.id)) {
        this.everyProdSwiper[el.id] = true;
      } else {
        this.everyProdSwiper[el.id] = false;
      }
    });
  }
  // new products logic!!!!!!!!!!!!!!!!!END
  // new products logic!!!!!!!!!!!!!!!!!END
  // new products logic!!!!!!!!!!!!!!!!!END
  // new products logic!!!!!!!!!!!!!!!!!END

  blackFriday: any = [];

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



  smallFilterFunct(p: number){
    this.shownProducts = this.products;
    for (let i = 0; i < this.filterCategoryAct.length; i++) {
      this.filterCategoryAct[i] = false; 
    }
    this.filterCategoryAct[p] = true;
    if (p != 0) {
      this.shownProducts = this.shownProducts.filter((el:any) => {
        return el.category.toLowerCase() == this.smallFilter[p].toLowerCase();
      })
    }else{
      this.homeService.GetProdData().subscribe((p) => {
        this.shownProducts = p;
      })
    }
  }
  
  d:any = 0;
  h:any = 0;
  m:any = 0;
  s:any = 0;

  countDownTimer(){
    setInterval(() => {
      this.d = 0;
      this.h = 0;
      this.m = 0;
      this.s = 0;
      let upTo:number = new Date(2025, 2, 1).getTime()
      let now:number = new Date().getTime()
      let distance = upTo - now;
      this.d = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.s = Math.floor((distance % (1000 * 60)) / (1000));
    }, 1000)
  }




  ngOnInit(): void {
    // Scroll to 'products' anchor when navigating from another page
    this.router.events.subscribe((event: any) => {
      if (event.constructor.name === 'NavigationEnd') {
        const fragment = this.route.snapshot.fragment;
        if (fragment === 'home') {
          this.scroller.scrollToAnchor('home');
        }
      }
    });

    this.countDownTimer();
    // REQUEST FOR HEADERS/BENEFITS/NEWPRODUCTS !!!!!!!!!
    this.homeService.GetData().subscribe((p) => {
      this.homePage = p;
      //HEADERS GALLERY VARIABLES!!!!!!!!!!! START
      //HEADERS GALLERY VARIABLES!!!!!!!!!!! START
      //HEADERS GALLERY VARIABLES!!!!!!!!!!! START
      //HEADERS GALLERY VARIABLES!!!!!!!!!!! START
      this.headerVars = this.homePage.find((el: any) => {
        return el.objectTitle == "header";
      })
      this.headerBackGallery = this.headerVars?.gallery;
      this.activeBackHeaderURL = this.headerBackGallery?.find((el: any) => {
        return el.imgID == this.activebackgroundImg;
      })?.imgURL
      //HEADERS GALLERY VARIABLES!!!!!!!!!!! END
      //HEADERS GALLERY VARIABLES!!!!!!!!!!! END
      //HEADERS GALLERY VARIABLES!!!!!!!!!!! END
      //HEADERS GALLERY VARIABLES!!!!!!!!!!! END

      // benefits component data!!!!!!!!!START
      // benefits component data!!!!!!!!!START
      // benefits component data!!!!!!!!!START
      // benefits component data!!!!!!!!!START
      this.benefits = this.homePage.find((el: any) => {
        return el.objectTitle == "benefits"
      })?.galleryAndContent
      // benefits component data!!!!!!!!!END
      // benefits component data!!!!!!!!!END
      // benefits component data!!!!!!!!!END
      // benefits component data!!!!!!!!!END

      this.newProducts = this.homePage.find((el: any) => {
        return el.objectTitle == "newProducts"
      })?.content
      this.leng = this.newProducts?.length ?? 0;
      this.newProducts?.forEach((el: any) => {
        this.everyProdSwiper.push(false);
      });
      this.newProducts?.forEach((el: any) => {
        if (this.shownSwiper.includes(el.id)) {
          this.everyProdSwiper[el.id] = true;
        } else {
          this.everyProdSwiper[el.id] = false;
        }
      });

      // stars and sales data!!!!!! START
      // stars and sales data!!!!!! START
      // stars and sales data!!!!!! START
      // stars and sales data!!!!!! START
      this.newProducts?.forEach((el: any) => {
        this.newProdSales.push({
          isSale: false,
          percent: 0,
          stars: [false, false, false, false, false]
        })
      });
      this.newProducts?.forEach((el: any) => {
        let id = el.id
        for (let i = 0; i < el.stars; i++) {
          this.newProdSales[id].stars[i] = true;
        }
      });
      this.newProducts?.forEach((el: any) => {
        if (el.price != el.salesPrice) {
          let saleId: any = el.id;
          this.newProdSales[saleId].isSale = true;
          this.newProdSales[saleId].percent = (Number(((el.price - el.salesPrice) / el.price).toFixed(2)) * 100).toFixed(0);
        }
      });
      // stars and sales data!!!!!! END
      // stars and sales data!!!!!! END
      // stars and sales data!!!!!! END
      // stars and sales data!!!!!! END
      this.blackFriday = this.homePage.find((el: any) => {
        return el.objectTitle == "blackFriday"
      })
    });


    // REQUEST FOR PRODUCTS  !!!!!!!!!!!!!!!!!!!!
    this.homeService.GetProdData().subscribe((p) => {
      this.products = p;
      this.shownProducts = p;
      // general stars: coutns stars and calculates sales!!!!START
      // general stars: coutns stars and calculates sales!!!!START
      // general stars: coutns stars and calculates sales!!!!START
      // general stars: coutns stars and calculates sales!!!!START
      this.products?.forEach((el:any) => {
        this.myProducts.push({
          isSale: false,
          percent: 0,
          stars: [false, false, false, false, false]
        })
      })
      this.products?.forEach((el:any) => {
        let id = el.id
        for (let i = 0; i < el.stars; i++) {
          this.myProducts[id].stars[i] = true;
        }
      })
      this.products?.forEach((el:any) => {
        if (el.price != el.salesPrice) {
          let saleId: any = el.id;
          this.myProducts[saleId].isSale = true;
          this.myProducts[saleId].percent = (Number(((el.price - el.salesPrice) / el.price).toFixed(2)) * 100).toFixed(0);
        }
      });
      // general stars: coutns stars and calculates sales!!!!END
      // general stars: coutns stars and calculates sales!!!!END
      // general stars: coutns stars and calculates sales!!!!END
      // general stars: coutns stars and calculates sales!!!!END
    })
  
    // REQUEST FOR EVERY PRODUCT !!!!!!!!
    this.service.GetAllProductData().subscribe((p: any) => {
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


    // REQUEST FOR SMALL FILTER CATEGORIES !!!!!!!
    this.homeService.GetSmallData().subscribe((p) => {
      this.smallFilter = p;
      // every product filterizer!!!!!!!
      this.smallFilter?.forEach((el:any) => {
        this.filterCategoryAct.push(false);
      })
      this.filterCategoryAct[0] = true;
    })

    // REQUEST FOR OFFERS !!!!!!!!
    this.homeService.GetOfferData().subscribe((p) => {
      this.offers = p;
    })
    


    // REQUEST FOR WORKERS DATA!!!!!!!!!
    this.homeService.GetWorkersData().subscribe((p) => {
      this.workers = p;
    })
    
  }
}
