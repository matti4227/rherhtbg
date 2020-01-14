import { Ingredient } from './ingredient';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fridge } from './fridge';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {

  constructor(private httpClient: HttpClient) { }

  getFridge(): Observable<Fridge> {
    return this.httpClient.get<Fridge>(`/api/fridge`);
  }

  updateFridge(ingredients: Ingredient[]): Observable<Fridge> {
    return this.httpClient.post<Fridge>(`/api/fridge`, ingredients);
  }
}
