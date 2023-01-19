import { MineracaoPilaDTO } from './../../../core/dto/mineracao-pila.dto';
import { WebsocketConnector } from './../../../core/ws/websocket.connector';
import { Component, OnInit } from '@angular/core';
import { MineracaoService } from 'src/app/core/service/mineracao.service';
import { faTrash, faArrowRightLong, faStop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-eventos-mineracao',
  templateUrl: './eventos-mineracao.component.html',
  styleUrls: ['./eventos-mineracao.component.css']
})
export class EventosMineracaoComponent implements OnInit {

  faTrash = faTrash;
  faStart = faArrowRightLong;
  faStop = faStop;
  items: MineracaoPilaDTO[] = [];
  loading: boolean = false;
  minerando: boolean = false;

  constructor(
    private mineracaoService: MineracaoService,
    private websocketConnector: WebsocketConnector) {
    }

  ngOnInit(): void {
    this.items = this.websocketConnector.mineracaoItems;
    this.minerando = this.websocketConnector.statusMineracao;
  }

  startMineracao() {
    this.mineracaoService.startStopLoop().subscribe(
      () => {
        try {
          this.websocketConnector
            .startConnectionProccess('/topic/mineracaoPila', this.onMessageCallback.bind(this));
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
          this.websocketConnector.unsubscribe('/topic/mineracaoPila');
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



  onMessageCallback(message: any) {
    this.items = this.websocketConnector.mineracaoItems;
  }

  clearList() {
    this.websocketConnector.clearMineracaoList();
    this.items = this.websocketConnector.mineracaoItems;
  }
}
