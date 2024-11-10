import { Component, OnInit } from '@angular/core';
import { LikedAndCartService } from '../liked-and-cart.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  constructor(public likes:LikedAndCartService, private allProds:ShopService) { }

  likedID = this.likes.likedArr;
  everyProds:any = [];
  likedProds:any = [];
  starsAndSale:any = [];

  shopLike(p:any){
    let id = p.path[0].id;
  if (id == '') {
    id = p.path[1].id
  }
  if (!this.likes.likedArr.includes(id)) {
    this.likes.likedArr.push(id)
    this.likes.likedBool[id] = true;
  }else{
    let t = this.likes.likedArr.indexOf(id);
    this.likes.likedBool[id] = false;
    this.likes.likedArr.splice(t, 1)
  }
  let forStorage = JSON.stringify(this.likes.likedArr)
  localStorage.setItem("liked", forStorage);
  let outStorage:any = localStorage.getItem("liked")
  this.likes.liked = JSON.parse(outStorage).length;
  this.likedProds = [];
  this.likedID.forEach((el:any) => {
    let x = this.everyProds.find((els:any) => {
      return els.id == el;
    })
    this.likedProds.push(x);
  });
  this.likedProds.forEach((el:any) => {
    let x = el.stars;
    let id = el.id;
    for (let i = 0; i < x; i++) {
      this.starsAndSale[id].stars[i] = true;
    }
  })
}

  ngOnInit(): void {
    this.allProds.GetAllProductData().subscribe((p:any) => {
      this.everyProds = p;
      console.log(this.likedID)
      this.likedID.forEach((el:any) => {
        let x = this.everyProds.find((els:any) => {
          return els.id == el;
        })
        this.likedProds.push(x);
      });

      this.likedProds.forEach((el:any) => {
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

      this.likedProds.forEach((el:any) => {
        let x = el.stars;
        let id = this.likedProds.indexOf(el);
        for (let i = 0; i < x; i++) {
          this.starsAndSale[id].stars[i] = true;
        }
      })

    })
    console.log(this.starsAndSale)
  }

}
