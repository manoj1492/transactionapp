import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginModel } from './LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private loginDialogRef: MatDialogRef<LoginComponent>, private router: Router) { }
  loginForm: FormGroup = new FormGroup({
    "email": new FormControl('',[Validators.required, Validators.email]),
    "password": new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  login(){
    console.log('Login');
    const loginModel: LoginModel = this.loginForm.getRawValue();
    this.authService.login(loginModel)
    .subscribe(next => {
      if(next != null && next.data === "Login Successful"){
        const basicToken = 'Basic ' + btoa(loginModel.email+ ":" + loginModel.password);
        this.authService.setSession(basicToken);
        this.error = null;
        this.router.navigate(['home']);
        this.loginDialogRef.close();
      }
    },errorResponse => {
        this.error = errorResponse.error;
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
