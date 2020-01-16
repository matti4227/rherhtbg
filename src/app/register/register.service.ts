import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../shared/interfaces';

@Injectable()
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  register(user: UserRegister): Observable<UserRegister> {
    return this.httpClient.post<UserRegister>('/api/register', user);
  }
}
