import { Component, OnInit } from '@angular/core';
import { EmployeeService, AlertService } from '@_services';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  depval: string;
  departments = [
    { id: 1, value: 'Dep 1' },
    { id: 2, value: 'Dep 2' },
    { id: 3, value: 'Dep 3' },
  ];
  constructor(private service: EmployeeService,
    private alert: AlertService,
    private route: Router,
    private router: ActivatedRoute) {
   
    // this.employeeForm.controls['department'].setValue(2);
    // this.service.initFormGroupWControl();

  }

  ngOnInit() {
    // this.service.initForm();
    this.service.initFormGroupWControl();
    // this.setDepartment(this.dep.value);
  }

  onClear() {
    this.alert.successSnack('::Submitted successfully');
    this.employeeForm.reset({ fullName: 'asd', gender: '1' })

    // this.service.initFormGroup();
  }


  onSubmitted() {
    const obj = {
      fullName: this.name,
      email: this.email,
      mobile: this.mobile.value,
      city: this.city.value,
      gender: this.gender.value,
      department: this.dep.value,
      hireDate: this.hireDate.value,
      isPermanent: this.isPermanent.value
    }
    console.log(this.employeeForm.value);
    this.employeeForm.reset({ fullName: 'asd', gender: '1' })
    this.alert.successSnack('::Submitted successfully');
  }

  get employeeForm() {
    return this.service.form;
  }

  get key() { return this.employeeForm.get('$key'); }

  get name() { return this.employeeForm.get('fullName'); }

  setName(val: String = '') { this.name.setValue(val); }

  get email() { return this.employeeForm.get('email'); }

  setEmail() { this.email.setValue(''); }

  get mobile() { return this.employeeForm.get('mobile'); }

  setMobile(val: number = 0) { this.mobile.setValue(val); }

  get city() { return this.employeeForm.get('city'); }

  setCity(val: string = '') { this.city.setValue(val); }

  get gender() { return this.employeeForm.get('gender'); }

  // setGender(val: number)

  get dep() { return this.employeeForm.get('department'); }

  setDepartment(val: any) {
    const depIndex = this.departments.findIndex(obj => obj.id === val);
    this.depval = this.departments[depIndex].value;
    // this.depval = val;
    console.log(this.depval);
    this.employeeForm.controls['department'].setValue(this.depval);
    
  }

  get hireDate() { return this.employeeForm.get('hireDate'); }

  // setHireDate()

  get isPermanent() { return this.employeeForm.get('isPermanent'); }

  compareDep(x: any, y: any) {
    return x && y && x == y.id;
  }

}
