import { EditComponent } from './account/edit.component';
import { MyRecipesComponent } from './account/my-recipes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { AuthGuard } from '../core/auth.guard';


const routes: Routes = [
  {
    path: 'account',
    canActivate: [AuthGuard],
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'my-recipes', pathMatch: 'full' },
      { path: 'my-recipes', component: MyRecipesComponent },
      { path: 'edit', component: EditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
