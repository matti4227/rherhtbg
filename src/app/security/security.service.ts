import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAuth, UserLogin } from '../shared/interfaces';


@Injectable()
export class SecurityService {

  securityObject: UserAuth;
  redirectUrl: string;

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
