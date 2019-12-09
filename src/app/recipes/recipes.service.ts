import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe } from './recipe';


@Injectable()
export class RecipesService {

  constructor(private httpClient: HttpClient) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>('/api/recipes');
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>('/api/recipes/create', recipe);
  }
}
