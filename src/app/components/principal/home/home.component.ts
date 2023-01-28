import { TransacaoService } from './../../../core/service/transacao.service';
import { Usuario } from './../../../core/model/usuario.model';
import { LoginService } from './../../../core/service/login.service';
import { Component, OnInit } from '@angular/core';
import { faAnchor, faAward, faCoins, faCopy, faTruckPickup, faWallet } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faCoins = faCoins;
  faWallet = faWallet;
  faCopy = faCopy;
  faPickaxe = faAward;
  toast: any;
  usuario: Usuario = new Usuario();
  pilasMinerados!: number;
  pilasTransferiveis!: number;

  constructor(private loginService: LoginService, private transacaoService: TransacaoService) {
    this.toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
  }

  ngOnInit(): void {
      this.loginService.loggedUser != null ? this.usuario = this.loginService.loggedUser : '';

      this.transacaoService.getPilas().subscribe(resp => {
        this.pilasMinerados = resp.valor;
      });

      this.transacaoService.getPilasTransferiveis().subscribe( resp => {
        this.pilasTransferiveis = resp.valor;
      });

  }

  copyClipboard(value: string) {
    navigator.clipboard.writeText(value);
    Swal.fire({
      toast: true,
      position: 'top-right',
      icon: 'info',
      title: 'Copiado!',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    }
}
