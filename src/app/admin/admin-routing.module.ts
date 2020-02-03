import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminIngredientsComponent } from './admin-ingredients/admin-ingredients.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminGuard } from '../core/admin.guard';


const routes: Routes = [{
  path: 'admin',
  canActivate: [AdminGuard],
  component: AdminComponent,
  children: [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component:  AdminUsersComponent},
    { path: 'ingredients', component: AdminIngredientsComponent },
    { path: 'categories', component: AdminCategoriesComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
