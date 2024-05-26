import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class jwtInterceptorInterceptor implements HttpInterceptor {
  //CTOR
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('user') !== null) {
      const stringUser: any = localStorage.getItem('user');
      const user = JSON.parse(stringUser);
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + user.token,
        }),
      });
    }
    return next.handle(request);
  }
}
