import {Component, OnInit} from '@angular/core';
import {authenticationService} from "../authentication.service";
import {User} from "../user.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [authenticationService]
})
export class LoginComponent implements OnInit {


  private username: string | undefined;
  private password: string | undefined;

  constructor(private authService: authenticationService,
              private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  getLoginCredentials() {
    this.username = (<HTMLInputElement>(
      document.getElementById('username_input')
    )).value;
    this.password = (<HTMLInputElement>(
      document.getElementById('password_input')
    )).value;
  }

  login() {
    this.getLoginCredentials()

    if (!this.validInputCheck()) {
      return;
    }


    this.authService.login(this.username, this.password);

  }

  validInputCheck() {
    if (this.username === undefined || this.username.length < 1) {
      this.toastr.error('Voer een gebruikersnaam in')
      return false;
    }

    if (this.password === undefined || this.password.length < 1) {
      this.toastr.error('Voer een wachtwoord in')
      return false;
    }

    return true;
  }

}
