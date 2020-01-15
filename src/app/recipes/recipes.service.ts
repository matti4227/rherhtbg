import { RecipePage } from './recipe-page';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe } from './recipe';


@Injectable()
export class RecipesService {

  constructor(private httpClient: HttpClient) { }

  getRecipesByParameters(
    search: string,
    category: string,
    difficulty: number,
    prepTime: number,
    sort: number,
    page: number,
    ingredients: object
    ): Observable<RecipePage> {
    return this.httpClient.post<RecipePage>(
      `/api/recipes?text=${search}&category=${category}&diff=${difficulty}&prepTime=${prepTime}&sort=${sort}&page=${page}`
      , ingredients);
  }

  getRecipesBySearch(name: string, page: number): Observable<RecipePage> {
    return this.httpClient.get<RecipePage>(`/api/recipes/search?name=${name}&page=${page}`);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>('/api/recipes/create', recipe);
  }

  getRecipe(recipeId: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`/api/recipes/${recipeId}`);
  }

  commentRecipe(comment: object, recipeId: number): Observable<object> {
    return this.httpClient.post<object>(`/api/recipes/${recipeId}/comment`, comment);
  }
}
