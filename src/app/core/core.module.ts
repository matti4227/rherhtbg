import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { HttpContentTypeInterceptor } from './http-content-type-interceptor';
import { HttpTokenInterceptor } from './http-token-interceptor';
import { DataService } from './data.service';
import { HasRoleDirective } from '../core/has-role.directive';


@NgModule({
  declarations: [HasRoleDirective],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    // { provide: HTTP_INTERCEPTORS, useClass: HttpContentTypeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  exports: [HasRoleDirective]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'Core Module');
  }
}
