import { PrincipalComponent } from './principal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventosMineracaoComponent } from './eventos-mineracao/eventos-mineracao.component';

export const routes: Routes = [
  {path: '', component: PrincipalComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'eventos-mineracao', component: EventosMineracaoComponent }
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
