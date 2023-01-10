import { WebsocketConnector } from './../../../core/ws/websocket.connector';
import { Component } from '@angular/core';
import { MineracaoService } from 'src/app/core/service/mineracao.service';

@Component({
  selector: 'app-eventos-mineracao',
  templateUrl: './eventos-mineracao.component.html',
  styleUrls: ['./eventos-mineracao.component.css']
})
export class EventosMineracaoComponent {

  wsConnector: any;
  items: any[] = [];
  constructor(
    private mineracaoService: MineracaoService) {
    }


  startStopMineracao() {
    this.mineracaoService.startStopLoop().subscribe();
  }

  subscribeEvents() {
    this.wsConnector = new WebsocketConnector('/mineracaoPila', this.onMessage.bind(this));
  }

  onMessage(message: any) {
    console.log(message);
    this.items.push(message.body);
  }
}
