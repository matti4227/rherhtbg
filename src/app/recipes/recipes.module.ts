import { FridgeModule } from './../fridge/fridge.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { RecipesService } from './recipes.service';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { FilterComponent } from './filter/filter.component';


@NgModule({
  declarations: [RecipeListComponent, RecipeEditComponent, FilterComponent],
  imports: [
    SharedModule,
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    FridgeModule
  ],
  providers: [RecipesService]
})
export class RecipesModule { }
