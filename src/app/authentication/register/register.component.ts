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
  // @ts-ignore
  user = new User();

  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  passwordRepeat: string | undefined;
  emailsArray: any | undefined;
  minPasswordLength: number = 4;


  constructor(private authService: authenticationService,
              private toastrmeassage: ToastrService
  ) {
  }

  ngOnInit(): void {
  }




  CheckInput() {   //TODO: misschien methode kleiner maken
    this.username = (<HTMLInputElement>(
      document.getElementById('username_input')
    )).value;
    this.email = (<HTMLInputElement>(
      document.getElementById('email_Input')
    )).value;
    this.password = (<HTMLInputElement>(
      document.getElementById('password_Input')
    )).value;
    this.passwordRepeat = (<HTMLInputElement>(
      document.getElementById('passwordRep_Input')
    )).value;
    this.emailsArray = this.email.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    );

    if (!this.checkEmail()) {
      this.toastrmeassage.error('voer een geldige email in')
      return;
    }

    if (!this.checkPasswords(this.password, this.passwordRepeat)) {
      console.log('wachtwoorden niet overeen of te kort')
      return;
    }

    this.createUser(this.username, this.email, this.password);

  }

  createUser(username: string, email: string, password: string) {
    this.user.username = username;
    this.user.email = email;
    this.user.password = password;
    this.registerUser(this.user);
  }

  checkPasswords(password: string, passwordRepeat: string): boolean {
    if (password === passwordRepeat && password.length >= this.minPasswordLength) {
      return true;
    } else if (password !== passwordRepeat) {
      this.toastrmeassage.error('wachtwoorden komen niet overeen');
    } else if (password.length < this.minPasswordLength) {
      this.toastrmeassage.error("Het wachtwoord moet minimaal " + this.minPasswordLength + " karakters lang zijn");
    } else {
      this.toastrmeassage.error('Er is een onbekende fout opgetreden bij het aanmaken van je account. Probeer het later opnieuw.');
    }
    return false;
  }

  checkEmail(): boolean {
    return this.emailsArray != null && this.emailsArray.length;
  }

  registerUser(user: User) {
    console.log(user);
    this.authService.saveUser(user).subscribe({
      next: () => this.toastrmeassage.success('account succesvol aangemaakt'),
      error: () => this.toastrmeassage.error('Er is iets fout gegaan bij het aanmaken van het account'),  //TODO: miss meer feedback geven
    });

  //   VOOOR MEER FEEDBACK HIERBOVENerror: err => {
  //     if (err.status === 403 || err.status === 400) {
  //       this.loginError = true;
  //     }
  }

}
