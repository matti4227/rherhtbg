import { RecipeEditGuard } from '../core/recipe-edit.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AuthGuard } from '../core/auth.guard';
import { RecipeResolver } from './recipe-resolver.service';


const routes: Routes = [
  {
    path: 'recipe/:id',
    component: RecipeComponent,
    resolve: { resolvedData: RecipeResolver }
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
