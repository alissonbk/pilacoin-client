import { WebsocketConnector } from './../../core/ws/websocket.connector';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { HomeComponent } from './home/home.component';
import { PrincipalRoutingModule } from './principal-routing.module';
import { HeaderComponent } from '../shared/header/header.component';
import { EventosMineracaoComponent } from './eventos-mineracao/eventos-mineracao.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
    declarations: [
        PrincipalComponent,
        HomeComponent,
        HeaderComponent,
        EventosMineracaoComponent,
    ],
    imports: [
        CommonModule,
        PrincipalRoutingModule,
        FontAwesomeModule
    ]
})
export class PrincipalModule { }