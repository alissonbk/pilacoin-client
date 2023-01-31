import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MineracaoService extends AbstractService {
  URL = environment.apiUrl + "/v1/mineracao";

  constructor(http: HttpClient) {
    super(http);
  }

  startStopLoop(): Observable<any> {
    return this.http.post<any>(`${this.URL}/startStopLoop`, {});
  }
}
