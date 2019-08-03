import { Component, OnInit, EventEmitter, Input, Output, OnChanges, HostListener } from '@angular/core';
import { Employee } from '@_models';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { EmployeeService } from '@_services';
import { filter } from 'rxjs/operators';
// import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit, OnChanges {
  @Input() emplInput;
  @Output() emplOutput:Employee;
  constructor(private router: ActivatedRoute, private route: Router
    ,private service: EmployeeService) { }

  ngOnInit() {
    // console.log(window.history.state);
    console.log(this.service.getEmp);
    this.route.events
    // .pipe(
    //   filter(event => event instanceof NavigationEnd)
    // )
    .subscribe((event) => {
      const emp = this.service.getEmp;
      this.service.setEmp(emp);
      console.log('event end');
    });
    // this.route.params.subscribe(
    //   data => {
    //     const obj = JSON.parse(data['queryParams']);
    //     console.log(obj['fullName']);
    //   }
    // )
    // console.log(JSON.parse(this.route.snapshot.params.));
    // this.route.data    
    // .subscribe(params => {
    //   // let parsed = JSON.parse(params["employee"]);
    //   console.log(params || 'empty');
    // }, err => {
    //   console.log(err);
    // });
  }
  @HostListener('click')
  printEmp(){
    console.log(this.emplInput);
  }
  ngOnChanges(){

  }
}
