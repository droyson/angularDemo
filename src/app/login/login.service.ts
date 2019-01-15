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
  }

  getLoggedInUser() {
    return this.loggedUserSubject.asObservable();
  }

  set loggedInUser(user: User) {
    this.loggedUserSubject.next(user);
  }

  addUser(username: string, password: string) {
    const user: User = new User(username, password);
    this._users.push(user);
    this.loggedInUser = user;
  }

  getUser(username: string, password: string) {
    let user = this._users.find((user) => {
      return user.username.toLowerCase() === username.toLowerCase();
    })
    return user;
  }

  login(username: string, password: string) {
    let user = this.getUser(username, password);
    if (user) {
      if (user.password === password) {
        this.loggedInUser = user;
        return true;
      }
      return false;
    }
    this.addUser(username, password);
    return true;
  }

  logout() {
    this.loggedInUser = null;
  }
}
