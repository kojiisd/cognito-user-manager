import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public confirmationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      id: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitSignup(value: any) {
    const id = value.id;
    const email = value.email;
    const password = value.password;

    this.auth.signUp(id, email, password).subscribe(
      result => {
        alert("ユーザー登録に成功しました。一覧画面から承認してください。");
        this.router.navigateByUrl('/', { replaceUrl: true });
      },
      error => {
        console.log(error);
      }
    );
  }


}
