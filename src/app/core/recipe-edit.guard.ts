import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';

@Injectable({
  providedIn: 'root'
})
export class RecipeEditGuard implements CanDeactivate<RecipeEditComponent> {

  canDeactivate(component: RecipeEditComponent): Observable<boolean> | Promise<boolean> | boolean {

    if (component.isDirty) {
      return confirm(`Czy jesteś pewien opuszczenia strony? Niezapisane zmiany zostaną utracone.`);
    }
    return true;
  }
}
