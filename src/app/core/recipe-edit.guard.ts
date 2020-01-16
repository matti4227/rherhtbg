import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';

@Injectable({
  providedIn: 'root'
})
export class RecipeEditGuard implements CanDeactivate<RecipeEditComponent> {

  canDeactivate(component: RecipeEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (component.isDirty) {
      const recipeName = component.recipe.name || 'New Product';
      return confirm(`Navigate away and lose all changes to ${recipeName}?`);
    }
    return true;
  }
}
