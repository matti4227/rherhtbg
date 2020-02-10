import { SecurityService } from './security/security.service';
import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pageTitle = 'App';
  loading = true;

  constructor(private securityService: SecurityService,
              private router: Router) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  get isLoggedIn(): boolean {
    return this.securityService.isLoggedIn;
  }

  get username(): string {
    if (this.isLoggedIn) {
      return this.securityService.getUsername;
    }
  }

  logout(): void {
    this.securityService.logout();

    if (location.pathname === '/welcome') {
      window.location.reload();
    } else {
      this.router.navigate(['/welcome']);
    }
  }

  get isAdmin(): boolean {
     return this.securityService.getRole === '[ADMIN]';
  }
}
