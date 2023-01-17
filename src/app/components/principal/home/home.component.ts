import { NumPilasDTO } from './../../../core/dto/num-pilas.dto';
import { TransacaoService } from './../../../core/service/transacao.service';
import { Usuario } from './../../../core/model/usuario.model';
import { LoginService } from './../../../core/service/login.service';
import { Component, OnInit } from '@angular/core';
import { faCoins, faCopy, faWallet } from '@fortawesome/free-solid-svg-icons';
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
  toast: any;
  usuario: Usuario = new Usuario();
  saldo!: number;

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
      this.transacaoService.getPilas().subscribe(numPilas => {
        this.saldo = numPilas.valor;
      })
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
