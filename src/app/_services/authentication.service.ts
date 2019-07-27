import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;
  env = environment.localUri;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setCurrentToken(token) {
    this.currentUserSubject.next(token);
  }

  login(username: string, password: string) {
    const obj = {
      email: username,
      password: password
    };
    return this.http.post(`${this.env}/api/auth/signin`, obj);
      // .subscribe(res => {
      //   console.log(res.toString);
      //   if(res.hasOwnProperty('token')){
      //     localStorage.setItem('currentUser', JSON.stringify(res));
      //           this.currentUserSubject.next(res.toString);
      //   }
      // }, err => console.log(err));
    // return this.http.post<any>(`${this.uri}/api/auth/signin`, obj)
    //     .pipe(map(user => {
    //         // login successful if there's a jwt token in the response
    //         if (user && user.token) {
    //           console.log(user);
    //           // if(user.token){
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //         }

    //         return user;
    //     }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return '';
  };

  handleResponse(res: Response){
    let body = res;
    console.log(body);
    return body || {};
  }
}
