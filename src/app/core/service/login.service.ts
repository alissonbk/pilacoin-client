import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractService } from './abstract.service';
import Swal from 'sweetalert2';
import { Usuario } from '../model/usuario.model';
import { Observable, tap } from 'rxjs';
import { ResponseDTO } from '../dto/response.dto';

@Injectable({providedIn: 'root'})
export class LoginService extends AbstractService {

  private readonly STORAGE_KEY = 'loggedUser';

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  login(email:string, password: string): Observable<Usuario> {
    const credenciais = {email: email, password: password};

    return this.http.post<Usuario>(`${this.API_URL}/v1/login`, credenciais)
      .pipe(
        tap(autenticado => {
          if (LoginService.checkLogged(autenticado)) {
          sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(autenticado));
          } else {
            Swal.fire('Não permitido', '', 'error');
          }
    }));

  }

  private static checkLogged(u: Usuario | ResponseDTO<void>): u is Usuario {
    return (u as Usuario).access_token !== undefined;
  }

  loggout(): void {
      sessionStorage.removeItem(this.STORAGE_KEY);
      this.redirectLogin();
  }

  redirectLogin(): void {
      this.router.navigate(['']);
  }

  get loggedUser(): Usuario | null {
      return JSON.parse(sessionStorage.getItem(this.STORAGE_KEY) as string);
  }

  setLoggedUser(usuario: Usuario): void {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
  }
}
