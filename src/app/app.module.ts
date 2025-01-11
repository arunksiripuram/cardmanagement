import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './userModule/user-login/user-login.component';
import { AdminLoginComponent } from './adminModule/admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewcardComponent } from './userModule/add-newcard/add-newcard.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateCardLabelComponent } from './adminModule/update-card-label/update-card-label.component';

// angular.module('app', ['ngAnimate', 'toastr'])

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    AdminLoginComponent,
    AddNewcardComponent,
    UpdateCardLabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
