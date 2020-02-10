import { InfoChange, Category, UserPage } from './../shared/interfaces';
import { concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, RecipePage, Recipe, Fridge, Ingredient } from '../shared/interfaces';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(page: number): Observable<UserPage> {
    return this.httpClient.get<UserPage>(`/api/users?page=${page}`)
    .pipe(
      concatMap(response => {
        for (let i = 0; i < response.content.length; i++) {
          response.content[i] = this.setAvatar(response.content[i]);
        }
        return of(response);
      })
    );
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(`/api/user`)
      .pipe(
        concatMap(response => {
          response = this.setAvatar(response);
          return of(response);
        })
      );
  }

  getUserByName(username: string): Observable<User> {
    return this.httpClient.get<User>(`/api/user/${username}`)
      .pipe(
        concatMap(response => {
          response = this.setAvatar(response);
          return of(response);
        })
       );
  }

  updateAvatar(avatar: FormData): Observable<any> {
    return this.httpClient.post(`/api/user/avatar`, avatar);
  }

  removeAvatar(): Observable<any> {
    return this.httpClient.post(`/api/user/avatar/remove`, null);
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.httpClient.post(`/api/user/password`,
    {
      oldPassword: oldPassword,
      newPassword: newPassword
    });
  }

  updateInfo(info: InfoChange): Observable<any> {
    return this.httpClient.post(`/api/user/info`, info);
  }

  deleteUser(username: string): Observable<any> {
    return this.httpClient.delete<any>(`/api/user/${username}`);
  }

  getUserRecipes(username: string, page: number, size: number): Observable<RecipePage> {
    return this.httpClient.get<RecipePage>(`/api/recipes/user/${username}?page=${page}&size=${size}`)
    .pipe(
      concatMap(response => {
        for (let i = 0; i < response.content.length; i++) {
          response.content[i].difficulty = this.setDifficulty(response.content[i].difficulty);
          response.content[i].preparationTime = this.setPrepTime(response.content[i].preparationTime);
        }
        return of(response);
      })
    );
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
      , ingredients)
        .pipe(
          concatMap(response => {
            for (let i = 0; i < response.content.length; i++) {
              response.content[i].difficulty = this.setDifficulty(response.content[i].difficulty);
              response.content[i].preparationTime = this.setPrepTime(response.content[i].preparationTime);
            }
            return of(response);
          })
        );
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

  updateRecipeImage(id: number, image: FormData): Observable<any> {
    return this.httpClient.post(`/api/recipes/${id}/edit/image`, image);
  }

  getRecipe(recipeId: number): Observable<Recipe> {
    if (recipeId === 0) {
      return of(this.initializeRecipe());
    }
    return this.httpClient.get<Recipe>(`/api/recipes/${recipeId}`)
      .pipe(
        concatMap(response => {
          response = { ...response, picture: 'data:image/jpeg;base64,' + response.picture };
          response = this.setAvatar(response);
          for (let i = 0; i < response.comments.length; i++) {
            response.comments[i] = this.setAvatar(response.comments[i]);
          }
          return of(response);
        })
      );
  }

  commentRecipe(comment: object, recipeId: number): Observable<object> {
    return this.httpClient.post<object>(`/api/recipes/${recipeId}/comment`, comment);
  }

  rateRecipe(score: object, recipeId: number): Observable<any> {
    return this.httpClient.post<any>(`/api/recipes/${recipeId}/rate`, score);
  }

  deleteRecipe(recipeId: number): Observable<any> {
    return this.httpClient.delete<any>(`/api/recipes/${recipeId}`);
  }

  getIngredients(): Observable<any> {
    return this.httpClient.get<any>(`/api/ingredients`);
  }

  getIngredientsPage(page: number): Observable<any> {
    return this.httpClient.get<any>(`/api/ingredients/page?page=${page}`);
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.post<Ingredient>(`/api/ingredients`, ingredient);
  }

  deleteIngredient(id: number): Observable<any> {
    return this.httpClient.delete<any>(`/api/ingredients/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`/api/recipeCategories`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`/api/recipeCategories`, category);
  }

  deleteCategory(name: string): Observable<any> {
    return this.httpClient.delete<any>(`/api/recipeCategories/${name}`);
  }

  getCookbook(page: number): Observable<RecipePage> {
    return this.httpClient.get<RecipePage>(`/api/cookbook?page=${page}`)
    .pipe(
      concatMap(response => {
        for (let i = 0; i < response.content.length; i++) {
          response.content[i].difficulty = this.setDifficulty(response.content[i].difficulty);
          response.content[i].preparationTime = this.setPrepTime(response.content[i].preparationTime);
        }
        return of(response);
      })
    );
  }

  addRecipeToCookbook(id: number): Observable<any> {
    return this.httpClient.post<any>(`/api/recipes/${id}`, null);
  }

  removeRecipeFromCookbook(recipeId: number): Observable<any> {
    return this.httpClient.delete<any>(`/api/cookbook/${recipeId}`);
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

  private setAvatar(data: any): any {
    console.log(data)
    if (data.avatar === null) {
      return { ...data, avatar: 'assets/blank_portrait.png' };
    } else {
      return { ...data, avatar: 'data:image/jpeg;base64,' + data.avatar };
    }
  }

  private setDifficulty(difficulty: any): any {
    if (difficulty === 1) {
      return 'łatwe';
    } else if (difficulty === 2) {
      return 'średnie';
    } else if (difficulty === 3) {
      return 'trudne';
    }
  }

  private setPrepTime(prepTime: any): any {
    if (prepTime === 1) {
      return 'do 30 min';
    } else if (prepTime === 2) {
      return '30 do 60 min';
    } else if (prepTime === 3) {
      return 'powyżej 60 min';
    }
  }
}
