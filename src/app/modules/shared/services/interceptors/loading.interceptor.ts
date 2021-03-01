import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
// import { AddActiveRequest, RemoveActiveRequest } from '../../../../store/';
// import { Store } from '@ngxs/store';
import { AlertService } from '../global/alert.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private router: Router, private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // this.store.dispatch(new AddActiveRequest(request.url));

        return next.handle(request).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    console.log('[LoadingInterceptor] Found error ' + 401);
                    // const host = window.location.host;
                    // if (host.startsWith('http')) {
                    //     window.location.replace(host + '/welcome');
                    // } else {
                    //     window.location.replace('http://' + host + '/welcome');
                    // }
                    // this.alertService.info('app.please_connect', true);
                    return Observable.throw(err);
                }
            },
        ), finalize(() => {
            // this.store.dispatch(new RemoveActiveRequest(request.url));
        }));
    }
}
