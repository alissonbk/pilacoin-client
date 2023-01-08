import {Observable, throwError} from 'rxjs';


import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class AbstractService {

    protected http: HttpClient;
    public headers: HttpHeaders;
    public fileHeaders: HttpHeaders;
    public readonly API_URL = environment.apiUrl;

    constructor(http: HttpClient) {
        this.http = http;
        this.headers = new HttpHeaders();
        this.fileHeaders = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
        this.fileHeaders.append('Content-Type', 'text/csv');
        this.fileHeaders.append('Content-Disposition', 'attachment');
    }

    public handleError(err: HttpErrorResponse): Observable<never> {
        return throwError(err);
    }
}
