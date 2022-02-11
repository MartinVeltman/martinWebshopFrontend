import {Component, OnInit} from '@angular/core';
import {authenticationService} from "../authentication.service";
import {User} from "../user.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [authenticationService],
})
export class RegisterComponent implements OnInit {

  user = {} as User;
  emailsArray: any | undefined;

  constructor(private authService: authenticationService,
              private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  createUser(username: string, email: string, password: string, passwordRepeat: string) {
    this.user.username = username;
    this.user.email = email;
    this.user.password = password;

    this.validateUser(email, password, passwordRepeat)
  }

  validateUser(email: string, password: string, passwordRepeat: string) {
    this.emailsArray = email.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    );

    if (!this.checkEmail()) {
      this.toastr.error('voer een geldige email in');
      return;
    }

    if (!this.authService.checkPasswords(password, passwordRepeat)) {
      return;
    }

    this.registerUser();
  }

  checkEmail(): boolean {
    return this.emailsArray != null && this.emailsArray.length;
  }

  registerUser() {
    this.authService.saveUser(this.user);
  }

}
