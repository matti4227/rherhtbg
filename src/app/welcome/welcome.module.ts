import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { SharedModule } from '../shared/shared.module';
import { FilterModule } from '../filter/filter.module';
import { RecipesModule } from '../recipes/recipes.module';


@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    FilterModule,
    RecipesModule
  ]
})
export class WelcomeModule { }
