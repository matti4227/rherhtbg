import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, RecipePage, Recipe, Fridge, Ingredient } from '../shared/interfaces';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(`/api/user`);
  }

  updateAvatar(avatar: FormData): Observable<any> {
    return this.httpClient.post(`/api/user/avatar`, avatar);
  }

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

  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>(`/api/recipes/${id}/edit`, recipe);
  }

  getRecipe(recipeId: number): Observable<Recipe> {
    if (recipeId === 0) {
      return of(this.initializeRecipe());
    }
    return this.httpClient.get<Recipe>(`/api/recipes/${recipeId}`);
  }

  commentRecipe(comment: object, recipeId: number): Observable<object> {
    return this.httpClient.post<object>(`/api/recipes/${recipeId}/comment`, comment);
  }

  getFridge(): Observable<Fridge> {
    return this.httpClient.get<Fridge>(`/api/fridge`);
  }

  updateFridge(ingredients: Ingredient[]): Observable<Fridge> {
    return this.httpClient.post<Fridge>(`/api/fridge`, ingredients);
  }

  private initializeRecipe(): Recipe {
    return {
      id: 0,
      name: null,
      description: null,
      preparation: null,
      preparationTime: null,
      difficulty: null,
      picture: null,
      recipeIngredients: [],
      categories: []
    };
  }
}
