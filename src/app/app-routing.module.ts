import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { LikesComponent } from './likes/likes.component';
import { ErrorComponent } from './error/error.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';



const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'likes',
    component: LikesComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'details/:category/:id',
    component: DetailsComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
