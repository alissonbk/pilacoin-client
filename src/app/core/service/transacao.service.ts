import { GenericResponseDTO } from './../dto/generic-response.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService extends AbstractService {
  URL = environment.apiUrl + "/v1/transacao";

  constructor(http: HttpClient) {
    super(http);
  }

  getPilas(): Observable<GenericResponseDTO<number>> {
    return this.http.get<GenericResponseDTO<number>>(`${this.URL}/get-pilas`, {});
  }

  getPilasTransferiveis(): Observable<GenericResponseDTO<number>> {
    return this.http.get<GenericResponseDTO<number>>(`${this.URL}/get-pilas-transferiveis`, {});
  }
}
