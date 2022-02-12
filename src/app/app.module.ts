import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import {itemService} from "./item/item.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from "@angular/common/http";
import {ItemModule} from "./item/item.module";
import {UserPageModule} from "./user-page/user-page.module";
import {ShoppingcartModule} from "./shoppingcart/shoppingcart.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {AdminPanelModule} from "./admin-panel/admin-panel.module";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ItemModule,
    UserPageModule,
    ShoppingcartModule,
    AuthenticationModule,
    AdminPanelModule
  ],
  providers: [itemService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
