import { Injectable } from '@angular/core';
import { RecipePage } from 'src/app/shared/interfaces';
import { Resolve } from '@angular/router';
import { DataService } from 'src/app/core/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRecipesResolver implements Resolve<RecipePage> {

  constructor(private dataService: DataService) { }

  resolve(): Observable<RecipePage> | Promise<RecipePage> | RecipePage {
    return this.dataService.getUserRecipes(JSON.parse(sessionStorage.getItem('username')), 0, 12);
  }

}
