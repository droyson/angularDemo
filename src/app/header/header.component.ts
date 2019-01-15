import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoginService } from "../login/login.service";
import { Subscription } from 'rxjs';
import { User } from '../login/User';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  appTitle: string;
  loginSubscription: Subscription;
  loggedInUser: User;

  homeSubscription: Subscription;
  itemsInCart: number;

  constructor(private loginSevice: LoginService, private homeService: HomeService) {
    this.appTitle = 'Demo Shop';
  }

  ngOnInit() {
    this.loginSubscription = this.loginSevice.getLoggedInUser().subscribe((user) => {
      this.loggedInUser = user;
    });

    this.homeSubscription = this.homeService.getSelectedItems().subscribe((selectedItems) => {
      this.itemsInCart = selectedItems.reduce((total, item) => {
        return total + item.selectedQuantity;
      }, 0);
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.homeSubscription.unsubscribe();
  }

}
