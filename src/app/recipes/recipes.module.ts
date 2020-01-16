import { FridgeModule } from './../fridge/fridge.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeComponent } from './recipe/recipe.component';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeEditComponent,
    RecipeComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FridgeModule,
    RecipesRoutingModule
  ],
  exports: [
    RecipeListComponent
  ]
})
export class RecipesModule { }
