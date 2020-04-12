import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { HttpTokenInterceptor } from './http-token-interceptor';
import { DataService } from './data.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'Core Module');
  }
}
