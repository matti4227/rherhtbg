import { CookbookComponent } from './cookbook.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { CookbookResolver } from './cookbook-resolver.service';


const routes: Routes = [
  { path: 'cookbook',
  component: CookbookComponent,
  canActivate: [AuthGuard],
  resolve: { resolvedData: CookbookResolver }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookbookRoutingModule { }
