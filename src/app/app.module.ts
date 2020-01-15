import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './register/register.module';
import { CoreModule } from './core/core.module';
import { SecurityModule } from './security/security.module';
import { RecipesModule } from './recipes/recipes.module';
import { UserModule } from './user/user.module';
import { MaterialModule } from './shared/material.module';
import { FridgeModule } from './fridge/fridge.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RegisterModule,
    CoreModule,
    SecurityModule,
    RecipesModule,
    RouterModule,
    UserModule,
    MaterialModule,
    FridgeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [MaterialModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
