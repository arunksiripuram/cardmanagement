import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {}
  canActivate( route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (sessionStorage.getItem('newREGid') != null) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
}
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {}
  canActivate( route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('Role') === '1' || sessionStorage.getItem('Role') === '2'){
        return true;
      } else {
        this.router.navigate(['/admin-login']);
        return false;
      }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isEnabled: boolean = false;
  constructor(
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (sessionStorage.getItem('isLoggedIn') === 'true') {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
      const isDisabled = localStorage.getItem('IsPwdUpd');
    return true;
  }
}
