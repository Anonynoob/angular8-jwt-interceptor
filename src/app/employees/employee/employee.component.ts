import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@_services';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  departments = [
    { id: 1, value: 'Dep 1' },
    { id: 2, value: 'Dep 2' },
    { id: 3, value: 'Dep 3' },
  ];
  constructor(private service: EmployeeService) { }

  ngOnInit() {
  }

  onClear() {
    this.service.form.reset();
    this.service.initFormGroup();
  }

  get name() { return this.service.form.controls['fullName'].value; }

  setName() { this.service.form.controls['fullName'].setValue(''); }

  get email() { return this.service.form.controls['email'].value; }

  setEmail() { this.service.form.controls['email'].setValue(''); }

  get mobile() {return this.service.form.controls['mobile'].value;}

  setMobile() {return this.service.form.controls['mobile'].setValue('');}
}
