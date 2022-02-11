import {Component, OnInit, ViewChild} from '@angular/core';
import {authenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [authenticationService]
})
export class UserPageComponent implements OnInit {

  @ViewChild('newPassword') newPassword: any;
  @ViewChild('repPassword') repPassword: any;

  username = JSON.parse(<string>localStorage.getItem('username'));
  ordervalue: number | undefined;
  isLoggedIn: boolean | undefined;


  constructor(private authService: authenticationService
  ) {
  }

  ngOnInit(): void {
    this.authService.getOrderValue();
    this.isLoggedIn = this.checkLoggedIn();
  }

  ngDoCheck() {
    this.ordervalue = Number(Number(Math.round(JSON.parse(<string>localStorage.getItem('orderValue'))
      * 100) / 100).toFixed(2));
  }


  checkLoggedIn() {
    return !(this.username == null || this.username.length < 1);
  }

  changePassword(password: string, passwordRepeat: string) {

    if (!this.authService.checkPasswords(password, passwordRepeat)) {
      return;
    }
    this.clearPasswordFields();

    this.authService.changePassword(this.username, password);
  }

  clearPasswordFields() {
    this.newPassword.nativeElement.value = '';
    this.repPassword.nativeElement.value = '';
  }

  checkOrderValue() {
    return this.ordervalue != undefined && this.ordervalue > 1;
  }

}
