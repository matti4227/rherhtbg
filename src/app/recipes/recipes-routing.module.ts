import { RecipeEditGuard } from '../core/recipe-edit.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AuthGuard } from '../core/auth.guard';
import { RecipeResolver } from '../core/recipe-resolver.service';


const routes: Routes = [
  {
    path: 'recipe/:id',
    component: RecipeComponent
  },
  {
    path: 'recipe/:id/edit',
    canActivate: [AuthGuard],
    canDeactivate: [RecipeEditGuard],
    resolve: { resolvedData: RecipeResolver },
    component: RecipeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
