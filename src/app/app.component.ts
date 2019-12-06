import { SecurityService } from './security/security.service';
import { Component, OnInit } from '@angular/core';
import { UserAuth } from './security/user-auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pageTitle = 'App';

  constructor(private securityService: SecurityService) { }

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
  }
}
