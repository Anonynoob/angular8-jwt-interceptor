import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../_services';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subs: Subscription;
  message: any;

  constructor(private alertService: AlertService){}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.subs = this.alertService.getAlert()
    .subscribe(message =>{
      switch (message && message.type) {
        case 'success':
          message.cssClass = 'alert alert-success';
          break;
        case 'error':
          message.cssClass = 'alert alert-danger';
          break;
        // default:
        //   message.cssClass = 'alert alert-info';
        //   break;
      }

      this.message = message;
    })
  }

}
