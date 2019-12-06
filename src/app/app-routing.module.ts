import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // { path: 'authenticate',
  //   loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  // },
  // { path: 'register', component: RegisterComponent },
  { path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: '',  pathMatch: 'full', redirectTo: 'authenticate'},
  { path: '**', pathMatch: 'full',  redirectTo: 'authenticate' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
