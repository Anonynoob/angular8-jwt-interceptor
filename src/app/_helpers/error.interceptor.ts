import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { AuthenticationService, AlertService, ConnectionService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
    private alert: AlertService,
    private connStatus: ConnectionService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let result;
    // this.connStatus.monitor().subscribe((status: boolean) => {
    //   if (status) {
    //     result = next.handle(request).pipe(catchError(err => {
    //       this.alert.error(err.error);
    //       if (err.status === 401) {
    //         // auto logout if 401 response returned from api

    //         // this.authenticationService.logout();
    //         of(this.authenticationService.logout()).pipe(
    //           delay(3000)
    //         ).subscribe(v => location.reload(true));

    //       }

    //       const error = err.error.message || err.statusText;
    //       // return throwError(error);
    //     }));
    //   } else {
    //     this.alert.error('Please Check your connection');
    //   }
    // }, err => {
    //   this.alert.error('Connection error ' + err);
    // });
    // return result;

    return next.handle(request).pipe(catchError(err => {

          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.alert.error(err.error);
            this.authenticationService.logout();
            of(this.authenticationService.logout()).pipe(
              delay(3000)
            ).subscribe(v => location.reload(true));

          } else if(err.status === 500) {
            this.alert.error("Server error");
          } else if(err.status === 0) {
            this.alert.error("Check your internet connection");
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
        }));
  }
}
