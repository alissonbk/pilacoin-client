import { Component } from '@angular/core';
import { faArrowRightLong, faStop, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ValidacaoPilaDTO } from 'src/app/core/dto/validacao-pila-dto';
import { WebsocketConnector } from 'src/app/core/ws/websocket.connector';

@Component({
  selector: 'app-eventos-validacao',
  templateUrl: './eventos-validacao.component.html',
  styleUrls: ['./eventos-validacao.component.css']
})
export class EventosValidacaoComponent {
  faTrash = faTrash;
  faStart = faArrowRightLong;
  faStop = faStop;
  wsConnector: any;

  items: ValidacaoPilaDTO[] = [];
  loading: boolean = false;
  ouvindoEventos: boolean = false;


  startListen() {
    try {
      this.subscribeEvents();
      this.ouvindoEventos = true;
    } catch (e) {
      console.log(e);
      this.ouvindoEventos = false;
    }
  }

  stopListen() {
    try {
      this.unsubscribeEvents();
      this.ouvindoEventos = false;
    } catch (e) {
      console.log(e);
      this.ouvindoEventos = true;
    }
  }

  subscribeEvents() {
    this.wsConnector = new WebsocketConnector('/topic/validacaoPilaBloco', this.onMessage.bind(this));
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
