import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  @Output() public logoutEvent = new EventEmitter();

  constructor(private loginDialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
  }

  openLoginForm() {
    this.loginDialog.open(LoginComponent, {
      disableClose: true
    });
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    this.logoutEvent.emit();
  }

}
