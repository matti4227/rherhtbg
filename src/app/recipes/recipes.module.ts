import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { RecipesService } from './recipes.service';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';


@NgModule({
  declarations: [RecipeListComponent, RecipeEditComponent],
  imports: [
    SharedModule,
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule
  ],
  providers: [RecipesService]
})
export class RecipesModule { }