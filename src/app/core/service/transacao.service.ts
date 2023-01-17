import { NumPilasDTO } from './../dto/num-pilas.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService extends AbstractService {
  URL = environment.apiUrl + "/transacao";

  constructor(http: HttpClient) {
    super(http);
  }

  getPilas(): Observable<NumPilasDTO> {
    return this.http.get<NumPilasDTO>(`${this.URL}/get-pilas`, {});
  }
}
