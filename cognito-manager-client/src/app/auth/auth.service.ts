import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment'

const AWS = require('aws-sdk');
const cognitoIdp = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean>;
  id: String;
  email: String;
  password: String;
  constructor(private router: Router) {
     Amplify.configure(environment.amplify);
     this.loggedIn = new BehaviorSubject<boolean>(false);
   }
  
   // SignUp
   public signUp(id, email, password): Observable<any> {
     this.id = id;
     this.email = email;
     this.password = password;
     return from(Auth.signUp(id, password, email));
   }

   // Verification
   public confirmSignUp(email, code): Observable<any> {
     return from(Auth.confirmSignUp(email, code));
   }

   // Login
   public signIn(userName, password): Observable<any> {
     return from(Auth.signIn(userName, password)).pipe(
       tap(() => this.loggedIn.next(true))
     );
   }

  public getData(): Observable<any> {
    return from(Auth.currentAuthenticatedUser());
  }

  public listUsers() {
    cognitoIdp.listUsers()
  }

  // Get authentication status
  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      map(result => {
        this.loggedIn.next(true);
        return true;
      }),
      catchError(error => {
        this.loggedIn.next(false);
        return of(false);
      })
    );
  }

  public getIdToken() {
    // console.log(Auth.currentAuthenticatedUser());
    return Auth.currentAuthenticatedUser();
  }
 
  // Logout
  public signOut() {
    from(Auth.signOut()).subscribe(
      result => {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      },
      error => console.log(error)
    );
  }

}
