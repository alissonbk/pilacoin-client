import { ChaveDTO } from './../dto/chave.dto';
import { NumPilasDTO } from './../dto/num-pilas.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService extends AbstractService {
  URL = environment.apiUrl + "/transferencia";

  constructor(http: HttpClient) {
    super(http);
  }

  validarChave(chave: ChaveDTO): Observable<any> {
    return this.http.post(`${this.URL}/validarChave`, chave,  { responseType: 'text' });
  }

  transferir(chave: ChaveDTO): Observable<any> {
    return this.http.post(`${this.URL}/transferir`, chave, { responseType: 'text'});
  }

}
