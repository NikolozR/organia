import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { FooterComponent } from './footer/footer.component';
import { LikesComponent } from './likes/likes.component';
import { ErrorComponent } from './error/error.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ShopComponent,
    FooterComponent,
    LikesComponent,
    ErrorComponent,
    CartComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
