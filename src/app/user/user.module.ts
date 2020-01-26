import { RecipesModule } from './../recipes/recipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { MyRecipesComponent } from './account/my-recipes.component';
import { EditComponent } from './account/edit.component';
import { UserRecipesComponent } from './profile/user-recipes.component';


@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    MyRecipesComponent,
    EditComponent,
    UserRecipesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    RecipesModule,
    SharedModule
  ]
})
export class UserModule { }
