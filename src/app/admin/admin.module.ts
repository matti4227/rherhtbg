import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminIngredientsComponent } from './admin-ingredients/admin-ingredients.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AdminComponent, AdminUsersComponent, AdminIngredientsComponent, AdminCategoriesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
