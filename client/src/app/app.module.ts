import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ReservasComponent } from './reservas/reservas.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { SesionComponent } from './sesion/sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
    ReservasComponent,
    NavComponent,
    RegisterComponent,
    SesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
