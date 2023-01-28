import { GenericResponseDTO } from './../../../core/dto/generic-response.dto';

import { TransferenciaService } from './../../../core/service/transferencia.service';
import { Component } from '@angular/core';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent {
  faTransfer = faMoneyBillTransfer;
  chave!: any;
  responseDTO: GenericResponseDTO<string> = new GenericResponseDTO<string>();
  chaveValidada: boolean = false;

  constructor(private transferenciaService: TransferenciaService) { }

  validarChave() {
    console.log(this.chave);
    this.responseDTO.valor = this.chave;

    this.transferenciaService.validarChave(this.responseDTO).subscribe(
      value => {
        Swal.fire('A chave foi validada!', value, 'success');
        this.chaveValidada = true;
      },
      error => {
        Swal.fire('Chave Inválida!', error.error, 'error');
      }
    )
  }

  transferir() {
    if (!this.chaveValidada) {
      Swal.fire('Atenção', 'é necessário validar a chave antes!', 'warning');
      return;
    } else {
      this.transferenciaService.transferir(this.responseDTO).subscribe(
        success => {
          Swal.fire('Sucesso', 'Transferencia realizada com sucesso', 'success');
        },
        err => {
          Swal.fire('Erro', JSON.parse(err.error).valor, 'error');
        }
      )
    }
  }

}
