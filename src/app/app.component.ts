import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, AlertService } from './_services';
import { User } from '@_models';
import { FormControl} from '@angular/forms';
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
    currentUser: User;
    alertStatus: any;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alert: AlertService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.alertStatus = this.alert.getAlert
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
