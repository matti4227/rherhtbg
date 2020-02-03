import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { Resolve } from '@angular/router';
import { DataService } from 'src/app/core/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

  constructor(private dataService: DataService) { }

  resolve(): Observable<User> | Promise<User> | User {
    return this.dataService.getUser();
  }

}
