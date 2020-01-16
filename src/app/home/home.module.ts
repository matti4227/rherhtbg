import { RecipesModule } from './../recipes/recipes.module';
import { FridgeModule } from './../fridge/fridge.module';
import { FilterModule } from './../filter/filter.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    FilterModule,
    FridgeModule,
    RecipesModule
  ]
})
export class HomeModule { }
