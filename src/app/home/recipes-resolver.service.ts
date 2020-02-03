import { RecipePage } from '../shared/interfaces';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../core/data.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<RecipePage> {

  constructor(private dataService: DataService) { }

  resolve(): Observable<RecipePage> | Promise<RecipePage> | RecipePage {
    return this.dataService.getRecipesByParameters('', '', 0, 0, 0, 0, []);
  }

}
