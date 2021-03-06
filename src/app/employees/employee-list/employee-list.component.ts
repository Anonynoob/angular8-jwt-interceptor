import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '@_services';
import { Employee } from '@_models';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {EmployeeEditComponent } from '../employee-edit/employee-edit.component';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  data: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

  constructor(private service: EmployeeService,
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit() {
    let array = this.service.getFakeEmployees();
    // console.log(array);
    of(this.service.getFakeEmployees()).pipe(
      delay(1000)
    ).subscribe(v => {
      this.data = new MatTableDataSource(array);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
    });

    // console.log(this.data);
    
  }

  onEdit(data) {
    // const sf = JSON.stringify(data);
    // console.log(JSON.parse(sf).fullName);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "employee": data.fullName
      }
    };
    this.service.setEmp(data);
    this.route.navigate(['/edit'])}
}
