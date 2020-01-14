import { SecurityService } from './security/security.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pageTitle = 'App';

  constructor(private securityService: SecurityService,
              private router: Router) { }

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
    this.router.navigate(['/recipes']);
  }
}
