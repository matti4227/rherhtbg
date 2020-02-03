import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesResolver } from './recipes-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { resolvedData: RecipesResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
