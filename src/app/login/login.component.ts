import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from "./login.service";
import { User } from './User';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private service: LoginService, private router: Router) {
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

      if (loginSuccess) {
        let url = this.service.redirectUrl || '/home';
        this.service.redirectUrl = '';
        this.router.navigate([url]);
      }
    } else {
      this.errorMessage = 'User Name and Password fields cannot be empty';
    }
  }

  logout() {
    this.service.logout();
    let url = this.service.redirectUrl || '/home';
    this.service.redirectUrl = '';
    this.router.navigate([url]);
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

}
