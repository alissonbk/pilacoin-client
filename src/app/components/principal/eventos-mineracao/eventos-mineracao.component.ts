import { Component } from '@angular/core';
import { MineracaoService } from 'src/app/core/service/mineracao.service';

@Component({
  selector: 'app-eventos-mineracao',
  templateUrl: './eventos-mineracao.component.html',
  styleUrls: ['./eventos-mineracao.component.css']
})
export class EventosMineracaoComponent {

  constructor(private mineracaoService: MineracaoService) {

  }


  startStopMineracao() {
    this.mineracaoService.startStopLoop().subscribe();
  }
}
