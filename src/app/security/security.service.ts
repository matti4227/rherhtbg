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
    return !!sessionStorage.getItem('username');
  }

  get getUsername(): string {
    return JSON.parse(sessionStorage.getItem('username'));
  }

  get getRole(): string {
    return JSON.parse(sessionStorage.getItem('role'));
  }

  constructor(private httpClient: HttpClient) { }

  authenticate(userLogin: UserLogin): Observable<UserAuth> {
    return this.httpClient.post<UserAuth>('/api/authenticate', userLogin)
      .pipe(
        tap( response => {
          this.securityObject = { ...response };
          sessionStorage.setItem('bearerToken', JSON.stringify(this.securityObject.bearerToken));
          sessionStorage.setItem('username', JSON.stringify(this.securityObject.userName));
          sessionStorage.setItem('role', JSON.stringify(this.securityObject.role));
        })
      );
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject() {
    sessionStorage.clear();
  }
}
