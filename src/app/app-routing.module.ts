import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcarConsultaComponent } from './marcar-consulta/marcar-consulta.component';


const routes: Routes = [
  { path: 'marcar-consulta', component: MarcarConsultaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
