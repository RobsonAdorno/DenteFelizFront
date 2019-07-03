import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthModule} from "./auth/auth.module";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {AuthRoutingModule} from "./auth/auth.routing.module";
import { RouterModule } from '@angular/router';
import { StorageService } from './service/storage.service';
import { LoginComponent } from './auth/components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AuthRoutingModule,
    DashboardRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AuthModule.forRoot()
  ],
  providers: [
    StorageService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
