import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './auth/cadastro-usuario/cadastro-usuario.component';
import { MarcarConsultaComponent } from './marcar-consulta/marcar-consulta.component';

const routes: Routes = [
  { path: '', component: MarcarConsultaComponent},
  { path: 'marcar-consulta', component: MarcarConsultaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
