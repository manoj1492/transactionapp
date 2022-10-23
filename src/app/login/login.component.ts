import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    this.authService.login(this.loginForm.getRawValue()).subscribe(response => {
      if(response != null){
        this.authService.setSession(response);
          this.router.navigate(['home']);
          this.loginDialogRef.close();
      }
    },error => {

    });
  }

}
