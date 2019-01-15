import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from "./login.service";
import { User } from './User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: User;
  errorMessage: string;
  loggedInUser: User;
  loginSubscription: Subscription;

  constructor(private service: LoginService) {
    this.errorMessage = '';
    this.user = new User();
  }

  ngOnInit() {
    this.loginSubscription = this.service.getLoggedInUser().subscribe((user) => {
      this.loggedInUser = user;
    });
  }

  login() {
    if (this.user.username.trim() && this.user.password.trim()) {
      let loginSuccess = this.service.login(this.user);
      this.errorMessage = loginSuccess ? '' : 'Incorrect Password';
    } else {
      this.errorMessage = 'User Name and Password fields cannot be empty';
    }
  }

  logout() {
    this.service.logout();
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

}
