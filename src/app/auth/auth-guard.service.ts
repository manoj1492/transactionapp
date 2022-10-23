import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService: AuthService ,private loginDialog: MatDialog) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (!this.authService.isLoggedIn()) {
        const dialogRef = this.loginDialog.open(
          LoginComponent,
          { height: 'auto', width: 'auto' }
        );
        return false;
      }
      return true;
  }
}
