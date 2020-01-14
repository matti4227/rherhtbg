import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`/api/users/${id}`);
  }

  updateAvatar(avatar: FormData): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('id'));
    return this.httpClient.patch(`/api/users/${userId}/avatar`, avatar);
  }
}
