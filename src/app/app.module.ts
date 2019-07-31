import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AlertComponent } from './_components/alert/alert.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product/product-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_modules/material.module';
// import { MatFormFieldModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeService } from '@_services';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component'
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        // MatFormFieldModule,
        // MatAutocompleteModule,
        // MatInputModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AlertComponent,
        ProductComponent,
        ProductEditComponent,
        EmployeesComponent,
        EmployeeComponent,
        EmployeeListComponent
    ],
    providers: [
      EmployeeService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
