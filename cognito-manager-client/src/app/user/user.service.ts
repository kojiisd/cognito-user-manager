import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, Group } from 'src/app/component/user/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private listUrl = environment.apiBaseUrl + '/api/list_users'
  private listInGroupUrl = environment.apiBaseUrl + '/api/list_users_in_group'
  private approveUrl = environment.apiBaseUrl + '/api/approve_user'
  private enableUrl = environment.apiBaseUrl + '/api/enable_user'
  private disableUrl = environment.apiBaseUrl + '/api/disable_user'
  private deleteUrl = environment.apiBaseUrl + '/api/delete_user'
  private listGroupUrl = environment.apiBaseUrl + '/api/list_groups'

  constructor(private http: HttpClient) { }

  public getUsers(token: string, group: string): Observable<User[]> {
    if (!group || group === "all") {
      return this.getAllUsers(token);
    } else {
      return this.getUsersInGroup(token, group);
    }
  }

  private getAllUsers(token: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };

    return this.http.get<any>(this.listUrl, httpOptions).pipe(
      map(users => users['Users']),
      tap(users => users['Users']),
      catchError(this.handleError('ListUsers', []))
    );
  }

  private getUsersInGroup(token: string, group: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };

    return this.http.get<any>(this.listInGroupUrl + "?GroupName=" + group, httpOptions).pipe(
      map(users => users['Users']),
      tap(users => users['Users']),
      catchError(this.handleError('ListUsersInGroup', []))
    );
  }

  public getGroups(token: string): Observable<Group[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };

    return this.http.get<any>(this.listGroupUrl, httpOptions).pipe(
      map(groups => groups['Groups']),
      tap(groups => groups['Groups']),
      catchError(this.handleError('ListGroups', []))
    );
  }

  public approveUser(userName: string, token: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'UserPoolId': environment.amplify.Auth.userPoolId,
      'Username' : userName
    }

    return this.http.post<any>(this.approveUrl, body, httpOptions).pipe(
      map(res => res['ResponseMetadata']),
      tap(res => res['ResponseMetadata']),
      catchError(this.handleError('ApproveUser', []))
    );
  }

  public enableUser(userName: string, token: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'Username' : userName
    }

    return this.http.post<any>(this.enableUrl, body, httpOptions).pipe(
      map(res => res['ResponseMetadata']),
      tap(res => res['ResponseMetadata']),
      catchError(this.handleError('EnableUser', []))
    );
  }

  public disableUser(userName: string, token: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'Username' : userName
    }

    return this.http.post<any>(this.disableUrl, body, httpOptions).pipe(
      map(res => res['ResponseMetadata']),
      tap(res => res['ResponseMetadata']),
      catchError(this.handleError('DisableUser', []))
    );
  }

  public deleteUser(userName: string, token: string): Observable<User[]> {
    const httpOptions = {
      headers: { Authorization: token}
    };
    const body = {
      'Username' : userName
    }

    return this.http.post<any>(this.deleteUrl, body, httpOptions).pipe(
      map(res => res['ResponseMetadata']),
      tap(res => res['ResponseMetadata']),
      catchError(this.handleError('DeleteUser', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
 
      this.log(`${operation} failed: ${error.message}`);
 
      return of(result as T);
    };
  }
 
  private log(message: string) {
    console.log('userService: ' + message);
  }
}
