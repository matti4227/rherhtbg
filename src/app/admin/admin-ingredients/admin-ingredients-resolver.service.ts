import { Injectable } from '@angular/core';
import { IngredientPage } from 'src/app/shared/interfaces';
import { Resolve } from '@angular/router';
import { DataService } from 'src/app/core/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminIngredientsResolver implements Resolve<IngredientPage> {

  constructor(private dataService: DataService) { }

  resolve(): Observable<IngredientPage> | Promise<IngredientPage> | IngredientPage {
    return this.dataService.getIngredientsPage(0);
  }
}
