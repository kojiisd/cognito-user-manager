import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmitLogin(value: any) {
    const id = value.id;
    const password = value.password;

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
