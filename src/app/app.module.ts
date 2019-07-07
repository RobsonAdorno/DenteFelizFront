import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { routing } from './app.routing';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { MarcarConsultaComponent } from './marcar-consulta/marcar-consulta.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from 'src/service/storage.service';
import { ConsultaService } from 'src/service/consulta.service';
import { MaterialModule } from 'src/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    MarcarConsultaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    MaterialModule,
  ],
  providers: [
    StorageService,
    ConsultaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
