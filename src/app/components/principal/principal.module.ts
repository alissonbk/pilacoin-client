import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { HomeComponent } from './home/home.component';
import { PrincipalRoutingModule } from './principal-routing.module';
import { HeaderComponent } from '../../core/shared/header/header.component';
import { EventosMineracaoComponent } from './eventos-mineracao/eventos-mineracao.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventosValidacaoComponent } from './eventos-validacao/eventos-validacao.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';



@NgModule({
    declarations: [
        PrincipalComponent,
        HomeComponent,
        HeaderComponent,
        EventosMineracaoComponent,
        EventosValidacaoComponent,
        TransferenciaComponent,
    ],
    imports: [
        CommonModule,
        PrincipalRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class PrincipalModule { }
