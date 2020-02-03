import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnumToArrayPipe } from './enum-to-array.pipe';
import { MaterialModule } from './material.module';
import { StarComponent } from './star/star.component';
import { PageNavComponent } from './page-nav/page-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwnRecipeDirective } from './own-recipe.directive';
import { ArraySortPipe } from './array-sort.pipe';


@NgModule({
  declarations: [
  EnumToArrayPipe,
  StarComponent,
  PageNavComponent,
  OwnRecipeDirective,
  ArraySortPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    EnumToArrayPipe,
    MaterialModule,
    StarComponent,
    PageNavComponent,
    NgbModule,
    OwnRecipeDirective,
    ArraySortPipe
  ]
})
export class SharedModule { }
