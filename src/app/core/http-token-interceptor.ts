import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(sessionStorage.getItem('bearerToken'));

    if (token) {
      const headers = req.headers.set('Authorization', 'Bearer ' + token);
      const authReq = req.clone({ headers });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
