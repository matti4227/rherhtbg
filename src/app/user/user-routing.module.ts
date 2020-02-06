import { EditComponent } from './account/edit.component';
import { MyRecipesComponent } from './account/my-recipes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { AuthGuard } from '../core/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UserResolver } from './account/user-resolver.service';
import { UserRecipesResolver } from './account/user-recipes-resolver.service';
import { UserProfileResolver } from './profile/user-profile-resolver.service';


const routes: Routes = [
  {
    path: 'account',
    canActivate: [AuthGuard],
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'my-recipes', pathMatch: 'full' },
      { path: 'my-recipes', component: MyRecipesComponent, resolve: { resolvedData: UserRecipesResolver} },
      { path: 'edit', component: EditComponent, resolve: { resolvedData: UserResolver } }
    ]
  },
  {
    path: 'profile/:username',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    resolve: { resolvedData: UserProfileResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
