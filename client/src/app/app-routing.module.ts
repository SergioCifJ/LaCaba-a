import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ReservasComponent } from './reservas/reservas.component';
import { RegisterComponent } from './register/register.component';
import { SesionComponent } from './sesion/sesion.component';
import { ListaReservasComponent } from './lista-reservas/lista-reservas.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'sesion', component: SesionComponent},
  { path: 'lista-reservas', component: ListaReservasComponent},
  { path: '**', component: HomeComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }