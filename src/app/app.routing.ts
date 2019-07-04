import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { MarcarConsultaComponent } from './marcar-consulta/marcar-consulta.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTES: Routes=[
    { path: 'login', component: LoginComponent },
    { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
    { path: 'marcar-consulta', component: MarcarConsultaComponent } 
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);

