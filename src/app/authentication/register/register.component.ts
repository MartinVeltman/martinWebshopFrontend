import {Component, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('password') password: any;
  @ViewChild('passwordRepeat') repPassword: any;

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

    this.validateUser(username, email, password, passwordRepeat)
  }

  validateUser(username: string, email: string, password: string, passwordRepeat: string) {
    this.emailsArray = email.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    );

    if (!this.checkEmail()) {
      this.toastr.error('voer een geldige email in');
      return;
    }

    if (!this.validUsername(username)) {
      return;
    }

    if (!this.authService.checkPasswords(password, passwordRepeat)) {
      return;
    }

    this.clearPasswordFields();

    this.registerUser();
  }

  checkEmail(): boolean {
    return this.emailsArray != null && this.emailsArray.length;
  }

  registerUser() {
    this.authService.saveUser(this.user);
  }

  validUsername(username: string) {
    if (username.length < 2) {
      this.toastr.error('De gebruikersnaam moet minimaal 2 karakters lang zijn')
      return false;
    }

    return true;
  }

  clearPasswordFields() {
    this.password.nativeElement.value = '';
    this.repPassword.nativeElement.value = '';
  }

}
