import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// apiUrl from the environment file
export const API_URL = new InjectionToken<string>('apiUrl');

@Injectable({
    providedIn: 'root'
})
export class ApiUrlInterceptor implements HttpInterceptor {
    constructor(@Inject(API_URL) private apiUrl: string) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(JSON.stringify(request.body));

        // Appened cookies on all requests to the server
        if (request.url.startsWith('/')) {
            console.log(`[ApiUrlInterceptor]: ${request.method} ` + request.url);
            const token = localStorage.getItem('token');
            request = request.clone({
                url: this.prepareUrl(request.url),
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
                // withCredentials: true
            });
        } else {
            request = request.clone({
                url: this.prepareUrl(request.url),
            });
        }

        return next.handle(request);
    }

    private prepareUrl(url: string): string {
        if (url.includes('i18n') || url.startsWith('.')) {
            return url;
        }
        url = this.isAbsoluteUrl(url) ? url : this.apiUrl + '/api/' + url;
        return url.replace(/([^:]\/)\/+/g, '$1');
    }

    private isAbsoluteUrl(url: string): boolean {
        const absolutePattern = /^https?:\/\//i;
        return absolutePattern.test(url);
    }
}
