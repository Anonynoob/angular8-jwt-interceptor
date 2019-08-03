import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { ProductComponent, ProductEditComponent } from '@products';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeComponent } from './employees/employee/employee.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products',
    component: ProductComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    component: EmployeesComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: EmployeeComponent,
  },
  // {
  //   path: 'edit/:id',
  //   component: ProductEditComponent,
  //   // canActivate: [AuthGuard]
  // },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
