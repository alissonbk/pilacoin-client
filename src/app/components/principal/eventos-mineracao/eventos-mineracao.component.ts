import { MineracaoPilaDTO } from './../../../core/dto/mineracao-pila.dto';
import { WebsocketConnector } from './../../../core/ws/websocket.connector';
import { Component } from '@angular/core';
import { MineracaoService } from 'src/app/core/service/mineracao.service';
import { faTrash, faArrowRightLong, faStop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-eventos-mineracao',
  templateUrl: './eventos-mineracao.component.html',
  styleUrls: ['./eventos-mineracao.component.css']
})
export class EventosMineracaoComponent {

  faTrash = faTrash;
  faStart = faArrowRightLong;
  faStop = faStop;
  wsConnector: any;
  items: MineracaoPilaDTO[] = [];
  loading: boolean = false;
  minerando: boolean = false;

  constructor(
    private mineracaoService: MineracaoService) {
    }


  startMineracao() {
    this.mineracaoService.startStopLoop().subscribe(
      () => {
        try {
          this.subscribeEvents();
          this.minerando = true;
        } catch (e) {
          console.log(e);
          this.minerando = false;
        }
      },
      err => {
        this.minerando = false;
      });
  }

  stopMineracao() {
    this.mineracaoService.startStopLoop().subscribe(
      () => {
        try {
          this.unsubscribeEvents();
          this.minerando = false;
        } catch (e) {
          console.log(e);
          this.minerando = true;
        }
      },
      err => {
        this.minerando = true;
      });
  }

  subscribeEvents() {
    this.wsConnector = new WebsocketConnector('/topic/mineracaoPila', this.onMessage.bind(this));
  }

  unsubscribeEvents() {
    if (this.wsConnector != null) {
      this.wsConnector.unsubscribe();
    }

  }

  onMessage(message: any) {
    let msg = JSON.parse(message.body).content;
    this.items.push(JSON.parse(msg));
    console.log(this.items);
  }

  clearList() { this.items = []; }
}
