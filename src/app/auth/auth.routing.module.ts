import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import { DashboardComponent } from '../dashboard/dashboard.component';


const routes: Routes = [
  { path: 'auth/components/login', component: LoginComponent},
  { path: 'auth/components/register', component: RegisterComponent},
  { path: 'dashboard/', component: DashboardComponent},
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
