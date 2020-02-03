import { Injectable } from '@angular/core';
import { RecipePage } from '../shared/interfaces';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DataService } from '../core/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookbookResolver implements Resolve<RecipePage> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<RecipePage> | Promise<RecipePage> | RecipePage {
    return this.dataService.getCookbook(0);
  }
}
