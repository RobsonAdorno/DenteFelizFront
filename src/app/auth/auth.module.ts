import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../material-module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from "./auth.routing.module";
import {AuthInterceptor} from "./auth.interceptor";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "../dashboard/dashboard.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthInterceptor
      ]
    }
  }
}
