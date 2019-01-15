import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { User, defaultUsers } from "./User";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _users: User[];
  private loggedUserSubject = new BehaviorSubject<User>(null);

  constructor() {
    this._users = defaultUsers;
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
  }

  getLoggedInUser() {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    return this.loggedUserSubject.asObservable();
  }

  set loggedInUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedUserSubject.next(user);
  }

  addUser(user: User) {
    this._users.push(user);
    this.loggedInUser = user;
  }

  getUser(username: string) {
    let user = this._users.find((user) => {
      return user.username.toLowerCase() === username.toLowerCase();
    })
    return user;
  }

  login(loginUser: User) {
    let user = this.getUser(loginUser.username);
    if (user) {
      // password validations are supposed to be done on the server. This is only for demo purpose.
      if (user.password === loginUser.password) {
        this.loggedInUser = user;
        return true;
      }
      return false;
    }
    this.addUser(loginUser);
    return true;
  }

  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('user');
  }
}
