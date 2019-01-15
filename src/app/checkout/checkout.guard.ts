import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url): Promise<boolean> {
    return new Promise((resolve) => {
      this.loginService.redirectUrl = url;
      this.loginService.getLoggedInUser().subscribe((user) => {
        if (user == null) {
          this.router.navigate(['/login']);
          return resolve(false);
        }
        return resolve(true);
      });
    });
  }
}
