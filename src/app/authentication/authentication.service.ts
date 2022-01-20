import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from "./user.model";


@Injectable()
export class authenticationService {
  baseUrl: string = "http://localhost:8080/api/v1";


  constructor(private http: HttpClient,
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
    console.log('method werkt')
    return this.http.get<User []>(this.baseUrl + '/users');

  }

  public login(username: string, password: string) {
    localStorage.setItem('username', JSON.stringify(username));
    return this.http.post(this.baseUrl + '/user/signin',
      {
        "username": username,
        "password": password
      },
      {
        headers: new HttpHeaders().set(
          'Content-Type', 'application/json'
        )
      }).subscribe(text => localStorage.setItem('jwtKey', JSON.stringify(text)));

  }


}
