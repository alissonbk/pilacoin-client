import { MineracaoPilaDTO } from './../../../core/dto/mineracao-pila.dto';
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
  items: MineracaoPilaDTO[] = [];
  constructor(
    private mineracaoService: MineracaoService) {
    }


  startStopMineracao() {
    this.mineracaoService.startStopLoop().subscribe();
  }

  subscribeEvents() {
    this.wsConnector = new WebsocketConnector('/topic/mineracaoPila', this.onMessage.bind(this));
  }

  onMessage(message: any) {
    let msg = JSON.parse(message.body).content;
    this.items.push(JSON.parse(msg));
    console.log(this.items);
  }
}
