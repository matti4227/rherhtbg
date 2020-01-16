import { RecipeResolved } from './../shared/interfaces';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<RecipeResolved> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<RecipeResolved> | Promise<RecipeResolved> | RecipeResolved {

    const id = route.paramMap.get('id');

    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({ recipe: null, errorMessage: message });
    }

    return this.dataService.getRecipe(+id)
      .pipe(
        map(next => ({ recipe: next })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ recipe: null, errorMessage: message });
        })
      );
  }

}
