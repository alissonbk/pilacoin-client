import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';


export class WebsocketConnector {

  stompClient: any;
  wsEndPoint:string = environment.apiUrl + '/websocket-handshake';


  constructor(
    private topic: string,
    private onMessage: Function,
    private callbackError?: Function) {
      const errorCallback = callbackError || this.onError;
      this.connect(errorCallback);
  }

  private connect(errorCallback: Function) {
    console.log("Starting ws Connection");
    const ws = new SockJS(this.wsEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe(this.topic, (event: any) => {
        this.onMessage(event);
      });
    }, errorCallback.bind(this));
  }

  private onError(error: any) {
    console.log("Erro ao se conectar ws: " + error);
    setTimeout(() => {
      console.log("Tentando se conectar novamente...");
      this.connect(this.onError);
    }, 3000);
  }

}
