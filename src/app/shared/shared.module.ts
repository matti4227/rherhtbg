import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnumToArrayPipe } from './enum-to-array.pipe';
import { MaterialModule } from './material.module';
import { StarComponent } from './star/star.component';
import { PageNavComponent } from './page-nav/page-nav.component';


@NgModule({
  declarations: [
  EnumToArrayPipe,
  StarComponent,
  PageNavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    EnumToArrayPipe,
    MaterialModule,
    StarComponent,
    PageNavComponent
  ]
})
export class SharedModule { }
