import { RecipesModule } from './../recipes/recipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookbookRoutingModule } from './cookbook-routing.module';
import { CookbookComponent } from './cookbook.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CookbookComponent],
  imports: [
    CommonModule,
    CookbookRoutingModule,
    RecipesModule,
    SharedModule
  ]
})
export class CookbookModule { }
