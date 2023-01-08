import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Injectable} from '@angular/core';

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import Swal from 'sweetalert2';

import {LoginService} from '../service/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService, private router: Router) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const u = this.loginService.loggedUser;
        if (u) {
            const jwtRequest = request.clone({setHeaders: {Authorization: 'Bearer ' + u.access_token}});
            return next.handle(jwtRequest).pipe(
                tap((evt) => {}, (err) => {
                        if ([401, 403].indexOf(err.status) !== -1) {
                            Swal.fire('Não permitido', '', 'error');
                            this.loginService.loggout();
                            location.reload();
                        }
                    }
                )
            );
        } else {
            return next.handle(request).pipe(
                tap(evt => {
                })
            );
        }
    }
}
