import { Component, OnInit } from '@angular/core';
import { faArrowRightLong, faStop, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ValidacaoPilaDTO } from 'src/app/core/dto/validacao-pila-dto';
import { WebsocketConnectorService } from 'src/app/core/service/websocket-connector.service';

@Component({
  selector: 'app-eventos-validacao',
  templateUrl: './eventos-validacao.component.html',
  styleUrls: ['./eventos-validacao.component.css']
})
export class EventosValidacaoComponent implements OnInit {
  faTrash = faTrash;
  faStart = faArrowRightLong;
  faStop = faStop;

  items: ValidacaoPilaDTO[] = [];
  loading: boolean = false;
  ouvindoEventos: boolean = false;

  constructor(private websocketConnector: WebsocketConnectorService) { }

  ngOnInit(): void {
      this.items = this.websocketConnector.validacaoItems;
      this.ouvindoEventos = this.websocketConnector.statusValidacao;
  }

  startListen() {
    try {
      this.websocketConnector
        .startConnectionProccess('/topic/validacaoPilaBloco', this.onMessageCallback.bind(this));
      this.ouvindoEventos = true;
    } catch (e) {
      console.log(e);
      this.ouvindoEventos = false;
    }
  }

  stopListen() {
    try {
      this.websocketConnector.unsubscribe('/topic/validacaoPilaBloco');
      this.ouvindoEventos = false;
    } catch (e) {
      console.log(e);
      this.ouvindoEventos = true;
    }
  }


  onMessageCallback(message: any) {
    this.items = this.websocketConnector.validacaoItems;
  }

  clearList() {
    this.websocketConnector.clearValidacaoList();
    this.items = this.websocketConnector.validacaoItems;
  }


}
