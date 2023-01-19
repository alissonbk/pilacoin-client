import { ValidacaoPilaDTO } from 'src/app/core/dto/validacao-pila-dto';
import { MineracaoPilaDTO } from './../dto/mineracao-pila.dto';
import { Inject, Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class WebsocketConnector {

  stompClient: any;
  wsEndPoint:string = environment.apiUrl + '/websocket-handshake';
  msgSubscribedMineracao: any;
  msgSubscribedValidacao: any;
  statusMineracao: boolean = false;
  statusValidacao: boolean = false;
  mineracaoItems: MineracaoPilaDTO[] = [];
  validacaoItems: ValidacaoPilaDTO[] = [];

  topic!: string;
  onMessageCallback!: Function;

  constructor() { }

  /**
   * Funciona de maneira similar com um construtor,
   * porém para esse singleton não é uma boa estratégia
   * instanciar diretamente as classes e sim usar apenas com injeção de dependencia
   **/
  public startConnectionProccess(topic: string, onMessageCallback: Function): void {
    this.topic = topic;
    this.onMessageCallback = onMessageCallback;

    if (this.topic.includes('mineracaoPila') && !this.statusMineracao) {
      this.connect();
      this.statusMineracao = true;
    }
    if (this.topic.includes('validacaoPilaBloco') && !this.statusValidacao) {
      this.connect();
      this.statusValidacao = true;
    }
  }

  private connect() {
    console.log("Starting ws Connection");
    const ws = new SockJS(this.wsEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame: any) => {
      if (this.topic.includes('mineracaoPila')) {
        this.msgSubscribedMineracao = this.stompClient.subscribe(this.topic, (event: any) => {
          this.onMessageMineracao(event);
        });
      }
      if (this.topic.includes('validacaoPilaBloco')) {
        this.msgSubscribedValidacao = this.stompClient.subscribe(this.topic, (event: any) => {
          this.onMessageValidacao(event);
        });
      }

    }, this.onError.bind(this));
  }

  private onError(error: any) {
    Swal.fire('Ops', 'Erro ao se inscrever no topico' + this.topic, 'error');
  }

  public unsubscribe(topic: string) {
    if (topic.includes('mineracaoPila')) {
      this.statusMineracao = false;
      this.msgSubscribedMineracao.unsubscribe();
      this.msgSubscribedMineracao = null;
    }
    if (topic.includes('validacaoPilaBloco')) {
      this.statusValidacao = false;
      this.msgSubscribedValidacao.unsubscribe();
      this.msgSubscribedValidacao = null;
    }

  }

  private onMessageValidacao(message: any) {
    if (this.validacaoItems && this.validacaoItems.length > 15) {
      this.validacaoItems = [];
    }
    this.validacaoItems.push(JSON.parse(JSON.parse(message.body).content));

    this.onMessageCallback ? this.onMessageCallback() : '';
  }

  private onMessageMineracao(message: any) {
    if (this.mineracaoItems && this.mineracaoItems.length > 15) {
      this.mineracaoItems = [];
    }
    this.mineracaoItems.push(JSON.parse(JSON.parse(message.body).content));
    this.onMessageCallback ? this.onMessageCallback() : '';
  }

  public clearMineracaoList() {
    this.mineracaoItems = [];
  }

  public clearValidacaoList() {
    this.validacaoItems = [];
  }

}
