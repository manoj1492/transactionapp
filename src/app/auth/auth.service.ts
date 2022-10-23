import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { LoginModel } from '../login/LoginModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginModel: LoginModel){
    return this.http.post<any>(environment.appBaseUrl + "login", loginModel);
  }

  setSession(authResult: any) {
    localStorage.setItem('id_token', authResult.idToken);
  }
  
  isLoggedIn() {
    if (!this.getExpiration()) {
      return false;
    }
    return moment().isBefore(this.getExpiration());
  }
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (!expiration) {
      return null;
    }
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
