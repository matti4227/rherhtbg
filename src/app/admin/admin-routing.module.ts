import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminIngredientsComponent } from './admin-ingredients/admin-ingredients.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminGuard } from '../core/admin.guard';
import { AdminUsersResolver } from './admin-users/admin-users-resolver.service';
import { AdminIngredientsResolver } from './admin-ingredients/admin-ingredients-resolver.service';
import { AdminCategoriesResolver } from './admin-categories/admin-categories-resolver.service';


const routes: Routes = [{
  path: 'admin',
  canActivate: [AdminGuard],
  component: AdminComponent,
  children: [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    {
      path: 'users',
      component:  AdminUsersComponent,
      resolve: { resolvedData: AdminUsersResolver }
    },
    {
      path: 'ingredients',
      component: AdminIngredientsComponent,
      resolve: { resolvedData: AdminIngredientsResolver }
    },
    {
      path: 'categories',
      component: AdminCategoriesComponent,
      resolve: { resolvedData: AdminCategoriesResolver }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
