import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;
  config: MatSnackBarConfig ={
    duration: 3000,
    horizontalPosition: "center",
    verticalPosition: "bottom"
  };
  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private _zone: NgZone) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) this.keepAfterRouteChange = false
        else this.clear();
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();

  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });

  }

  successSnack(message: string) {
    console.log('snack');
    this.config['panelClass'] = ['notification', 'success'];
    this._zone.run(() => {
      this.snackBar.open(message, '', this.config);
    });

  }

  error(message: String, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', text: message });
  }

  clear() {
    this.subject.next();
  }
}
