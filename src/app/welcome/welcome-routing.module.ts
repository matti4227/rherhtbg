import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { RecipesResolver } from '../home/recipes-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    resolve: { resolvedData: RecipesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
