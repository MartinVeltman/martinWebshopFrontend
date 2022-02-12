import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationComponent} from "./authentication.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";



@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
