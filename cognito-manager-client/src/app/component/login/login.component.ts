import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';

export class User {
  constructor(public id: string, public password: string) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User('', '');
  hide = true;
  
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }


  onSubmitLogin() {
    const id = this.user.id;
    const password = this.user.password;

    this.auth.signIn(id, password).subscribe(
      result => {
        this.router.navigate(['/']);
      },
      error => {
        alert("Invalid UserID or Password.");
        console.log(error);
      }
    )
  }

}
