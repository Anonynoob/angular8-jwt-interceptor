import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '@_services';

@Component({ templateUrl: 'login.component.html', styleUrls:['login.component.css'] })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
      // .pipe(first())
      .subscribe(
        data => {
          console.log(data['token']);
          localStorage.setItem('currentUser', JSON.stringify(data['token']));
                this.authenticationService.setCurrentToken(data);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.authenticationService.handleError(error);
          // if(error === 404) this.error = 'Not Found';
          // else if(error === 400) this.error = 'Unauthorized';
          // this.error = 'Access Denied';
          // console.log(error);
          // this.error = error.error;
          // this.alertService.error(this.error);
          this.loading = false;
        });
  }
}
