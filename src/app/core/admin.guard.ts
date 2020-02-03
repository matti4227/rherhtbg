import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../security/security.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private securityService: SecurityService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAdminLoggedIn(state.url);
  }

  checkAdminLoggedIn(url: string): boolean {
    if (this.securityService.isLoggedIn && this.securityService.getRole === '[ADMIN]') {
      return true;
    }
    this.securityService.redirectUrl = url;
    this.router.navigate(['/authenticate']);
    return false;
  }
}
