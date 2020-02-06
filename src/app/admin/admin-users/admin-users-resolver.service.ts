import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserPage } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/core/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersResolver implements Resolve<UserPage> {

  constructor(private dataService: DataService) { }

  resolve(): Observable<UserPage> | Promise<UserPage> | UserPage {
    return this.dataService.getAllUsers(0);
  }
}
