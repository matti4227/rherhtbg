import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserLogin } from './user-login';
import { UserAuth } from './user-auth';

@Injectable()
export class SecurityService {
  securityObject: UserAuth;

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  get getUsername(): string {
    return JSON.parse(localStorage.getItem('username'));
  }

  constructor(private httpClient: HttpClient) { }

  authenticate(userLogin: UserLogin): Observable<UserAuth> {
    return this.httpClient.post<UserAuth>('/api/authenticate', userLogin)
      .pipe(
        tap( response => {
          this.securityObject = { ...response };
          localStorage.setItem('bearerToken', JSON.stringify(this.securityObject.bearerToken));
          localStorage.setItem('username', JSON.stringify(this.securityObject.userName));
          localStorage.setItem('id', JSON.stringify(this.securityObject.id));
        })
      );
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject() {
    localStorage.clear();
  }
}
