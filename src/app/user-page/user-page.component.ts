import {Component, OnInit, ViewChild} from '@angular/core';
import {authenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [authenticationService]
})
export class UserPageComponent implements OnInit {
  // @ts-ignore
  @ViewChild('repPassword') reppassword;
  // @ts-ignore
  @ViewChild('newPassword') newpassword;

  username = JSON.parse(<string>localStorage.getItem('username'));
  password: string | undefined;
  passwordRepeat: string | undefined;
  ordervalue: number | undefined;
  isLoggedIn: boolean | undefined;



  constructor(private authService: authenticationService
  ) {
  }

  ngOnInit(): void {
    this.authService.getOrderValue(this.username);
    this.isLoggedIn = this.checkLoggedIn();
  }

  ngDoCheck(){
    this.ordervalue = Number(Number(Math.round(JSON.parse(<string>localStorage.getItem('orderValue')) * 100) / 100).toFixed(2));
  }



  checkLoggedIn(){
    return !(this.username == null || this.username.length < 1);

  }

  changePassword() {
    this.password = (<HTMLInputElement>(
      document.getElementById('password_Input')
    )).value;
    this.passwordRepeat = (<HTMLInputElement>(
      document.getElementById('passwordRep_Input')
    )).value;

    this.clearPasswordFields()

    if (!this.authService.checkPasswords(this.password, this.passwordRepeat)) {
      return;
    }

    this.authService.changePassword(this.username, this.password);
  }

  clearPasswordFields(){
    this.reppassword.nativeElement.value = '';
    this.newpassword.nativeElement.value= '';
  }

  checkOrderValue(){
    // @ts-ignore
    return this.ordervalue != undefined && this.ordervalue > 1;

  }

}
