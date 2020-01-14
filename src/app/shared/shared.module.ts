import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnumToArrayPipe } from './enum-to-array.pipe';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
  EnumToArrayPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    EnumToArrayPipe,
    MaterialModule
  ]
})
export class SharedModule { }
