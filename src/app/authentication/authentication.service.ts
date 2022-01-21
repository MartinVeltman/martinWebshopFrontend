import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ComponentFactoryResolver, Injectable, ViewContainerRef} from "@angular/core";
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from "./user.model";
import {ToastrService} from "ngx-toastr";
import {Item} from "../item/item.model";
import {Router} from "@angular/router";


@Injectable()
export class authenticationService {
  baseUrl: string = "http://localhost:8080/api/v1";
  minPasswordLength: number = 4;


  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private router: Router
  ) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  public saveUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.baseUrl + "/user/signup"
      , user
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'

        })
      })
      .pipe(catchError(this.handleError));
  }


  public getUsers(): Observable<User []> {
    return this.http.get<User []>(this.baseUrl + '/users');

  }

  public login(username: string, password: string) {
    localStorage.removeItem('jwtKey');

    return this.http.post(this.baseUrl + '/user/signin',
      {
        "username": username,
        "password": password
      },
      {
        headers: new HttpHeaders().set(
          'Content-Type', 'application/json'
        )
      }).subscribe({
      next: (jwtToken: any) => this.loginSucces(jwtToken, username),
      error: err => this.toastr.error('De inloggegevens zijn onjuist')
    });


  }

  loginSucces(data: any, username: string) {
    localStorage.setItem('jwtKey', JSON.stringify(data));
    localStorage.setItem('username', JSON.stringify(username));
    this.toastr.success('Succesvol ingelogd');
    this.router.navigate(['/', 'userPanel'])

  }

  checkPasswords(password: string, passwordRepeat: string): boolean {
    if (password === passwordRepeat && password.length >= this.minPasswordLength) {
      return true;
    } else if (password !== passwordRepeat) {
      this.toastr.error('wachtwoorden komen niet overeen');
    } else if (password.length < this.minPasswordLength) {
      this.toastr.error("Het wachtwoord moet minimaal " + this.minPasswordLength + " karakters lang zijn");
    } else {
      this.toastr.error('Er is een onbekende fout opgetreden bij het aanmaken van je account. Probeer het later opnieuw.');
    }
    return false;
  }

  public changePassword(username: String, newpassword: String) {
    return this.http.patch(
      this.baseUrl + `/user/changePassword?username=${username}&newpassword=${newpassword}`
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',

        })
      }).subscribe({
      next: () => this.toastr.success('Wachtwoord succesvol veranderd'),
      error: () => this.toastr.error('Wachtwoord veranderen mislukt, waarschijnlijk bent u niet ingelogd')
    });
  }

  public getOrderValue(username: String) {
    return this.http.get(this.baseUrl + `/user/getOrderValue?username=${username}`)
      .subscribe(ordervalue => localStorage.setItem('orderValue', JSON.stringify(ordervalue)));
  }


}

