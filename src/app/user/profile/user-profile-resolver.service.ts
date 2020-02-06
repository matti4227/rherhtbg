import { Injectable } from '@angular/core';
import { UserProfile } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/core/data.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements Resolve<UserProfile> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<UserProfile> | Promise<UserProfile> | UserProfile {
    const username = route.paramMap.get('username');
    const userInfo$ = this.dataService.getUserByName(username);
    const userRecipes$ = this.dataService.getUserRecipes(username, 0, 3);

    return combineLatest([userInfo$, userRecipes$])
      .pipe(
        map(
          ([user, recipePage]) => ({ user, recipePage })
        )
      );
  }
}
