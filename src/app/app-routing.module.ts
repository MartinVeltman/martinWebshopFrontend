import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingcartComponent} from "./shoppingcart/shoppingcart.component";
import {ItemComponent} from "./item/item.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {UserPageComponent} from "./user-page/user-page.component";

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
  },
  {
    path: 'webshop',
    component: ItemComponent,
  },
  {
    path: 'shoppingcart',
    component: ShoppingcartComponent,
  },
  {
    path: 'login',
    component: AuthenticationComponent
  },
  {
    path: 'registreren',
    component: RegisterComponent
  },
  {
    path: 'productenToevoegen',
    component: AdminPanelComponent
  },
  {
    path: 'userPanel',
    component: UserPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
