import { Component, OnInit } from '@angular/core';
import { LikedAndCartService } from '../liked-and-cart.service';
import { NavService } from '../nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private navService: NavService, public like: LikedAndCartService, private router: Router) { }
  navDynamicInfo:any = [];

  middleNavDrop:boolean = false;
  categoryVal:any = "-1";
  categorySelect(){
    let chosen = Number(this.categoryVal);
    if(chosen >= 0){
      this.middleNavDrop = true;
    }else{
      this.middleNavDrop = false;
    }
  }


  categories:any = '';

  supportObj:any = '';


  others:boolean = true;
  otherOrLess(){
    this.others = !this.others;
  }

  goToCategory(category: string) {
    this.router.navigate(['/shop'], { queryParams: { category } });
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
