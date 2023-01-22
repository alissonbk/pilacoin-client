import { ChaveDTO } from './../../../core/dto/chave.dto';
import { TransferenciaService } from './../../../core/service/transferencia.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  chaveDTO: ChaveDTO = new ChaveDTO();
  chaveValidada: boolean = false;

  constructor(private transferenciaService: TransferenciaService) { }

  validarChave() {
    console.log(this.chave);
    this.chaveDTO.value = this.chave;

    this.transferenciaService.validarChave(this.chaveDTO).subscribe(
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
      this.transferenciaService.transferir(this.chave).subscribe(
        success => {
          console.log(success);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}
