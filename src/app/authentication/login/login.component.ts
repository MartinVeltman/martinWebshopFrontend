import {Component, OnInit} from '@angular/core';
import {authenticationService} from "../authentication.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [authenticationService]
})
export class LoginComponent implements OnInit {

  constructor(private authService: authenticationService,
              private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }


  login(username: string, password: string) {
    if (!this.validInputCheck(username, password)) {
      return;
    }

    this.authService.login(username, password);
  }

  validInputCheck(username: string, password: string) {
    if (username === undefined || username.length < 1) {
      this.toastr.error('Voer een gebruikersnaam in')
      return false;
    }

    if (password === undefined || password.length < 1) {
      this.toastr.error('Voer een wachtwoord in')
      return false;
    }

    return true;
  }

}
