import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FridgeComponent } from './fridge.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FridgeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    FridgeComponent
  ]
})
export class FridgeModule { }
