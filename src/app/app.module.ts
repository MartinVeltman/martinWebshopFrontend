import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { LoginComponent } from './authentication/login/login.component';
import { ShoppingpageComponent } from './shoppingpage/shoppingpage.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import {itemService} from "./item/item.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import {HttpClientModule} from "@angular/common/http";
import { AdminPanelComponent } from './admin-panel/admin-panel.component';



@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ShoppingcartComponent,
    LoginComponent,
    ShoppingpageComponent,
    RegisterComponent,
    AuthenticationComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [itemService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
