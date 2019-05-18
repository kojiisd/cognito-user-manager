import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  subscription: Subscription;
  username: String;
  loggedIn: boolean;
 
  constructor(public auth: AuthService, private cdr: ChangeDetectorRef) {
    this.username = localStorage.getItem(
      environment.localstorageBaseKey + 'LastAuthUser'
    );
  }
 
  ngOnInit() {
    this.subscription = this.auth.isAuthenticated().subscribe(result => {
      this.loggedIn = result;
    });
  }
  ngAfterViewChecked() {
    this.username = localStorage.getItem(
      environment.localstorageBaseKey + 'LastAuthUser'
    );
    this.cdr.detectChanges();
  }
 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
  onClickLogout() {
    this.auth.signOut();
  }
}
