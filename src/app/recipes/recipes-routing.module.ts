import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';


const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'edit', component: RecipeEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
