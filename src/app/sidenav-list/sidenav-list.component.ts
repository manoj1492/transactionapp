import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  @Output() public logoutEvent = new EventEmitter();

  constructor(private loginDialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
  }

  openLoginForm() {
    this.loginDialog.open(LoginComponent, {
      disableClose: true
    });
  }

  onSidenavClose(){
    this.sidenavClose.emit();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    this.logoutEvent.emit();
  }

}
