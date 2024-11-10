import { Component, OnInit } from '@angular/core';
import { LikedAndCartService } from '../liked-and-cart.service';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private navService: NavService, public like: LikedAndCartService) { }
  navDynamicInfo:any = [];

  middleNavDrop:boolean = false;
  categoryVal:any = "-1";
  categorySelect(){
    let chosen = Number(this.categoryVal);
    if(chosen >= 0){
      this.middleNavDrop = true;
      console.log("dade")
    }else{
      this.middleNavDrop = false;
      console.log("nope")
    }
  }


  categories:any = '';

  supportObj:any = '';


  others:boolean = true;
  otherOrLess(){
    this.others = !this.others;
  }



  categoryDropBool:boolean = false;
  chevronUpBool:boolean = false;
  categoryDrop(){
    this.categoryDropBool = !this.categoryDropBool;
    this.chevronUpBool = !this.chevronUpBool;
    this.others = true;
  }

  
  ngOnInit(): void {
    this.navService.GetData().subscribe((p:any) => {
      this.navDynamicInfo = p;

      this.categories = this.navDynamicInfo.find((el:any) => {
        return el.objectTitle == "categories";
      })?.categories
    
      this.supportObj = this.navDynamicInfo.find((el:any) => {
        return el.objectTitle == "support";
      })


    });

    

    
  }

}
