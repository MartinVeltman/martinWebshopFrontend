import { Component, OnInit } from '@angular/core';
import {authenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [authenticationService]
})
export class UserPageComponent implements OnInit {

  username = JSON.parse(<string>localStorage.getItem('username'));
  password: string | undefined;
  passwordRepeat: string | undefined;
  ordervalue: number | undefined;


  constructor(private authService: authenticationService
  ) { }

  ngOnInit(): void {

  }

  ngDoCheck(): void{
    this.authService.getOrderValue(this.username);
    this.ordervalue = Number(Number(Math.round(JSON.parse(<string>localStorage.getItem('orderValue')) * 100) / 100).toFixed(2));
  }

  changePassword(){

    this.password = (<HTMLInputElement>(
      document.getElementById('password_Input')
    )).value;
    this.passwordRepeat = (<HTMLInputElement>(
      document.getElementById('passwordRep_Input')
    )).value;

    if (!this.authService.checkPasswords(this.password, this.passwordRepeat)) {
      return;
    }

    this.authService.changePassword(this.username, this.password);
  }

}
