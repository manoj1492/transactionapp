import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../login/LoginModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginModel: LoginModel){
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(loginModel.email+":"+loginModel.password),
    });
    return this.http.get<any>(environment.appBaseUrl, {
      headers
    });
  }

  setSession(authResult: any) {
    localStorage.setItem('token', authResult);
  }
  
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }

}
