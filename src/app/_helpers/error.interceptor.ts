import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
    private alert: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      this.alert.error(err.error);
      if (err.status === 401) {
        // auto logout if 401 response returned from api

        // this.authenticationService.logout();
        of(this.authenticationService.logout()).pipe(
          delay(3000)
        ).subscribe(v => location.reload(true));

      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
