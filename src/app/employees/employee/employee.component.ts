import { Component, OnInit } from '@angular/core';
import { EmployeeService, AlertService } from '@_services';
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
  constructor(private service: EmployeeService,
    private alert: AlertService) {
    this.service.initForm();
    // this.service.initFormGroupWControl();

  }

  ngOnInit() {
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
      department: this.department.value,
      hireDate: this.hireDate.value,
      isPermanent: this.isPermanent.value
    }
    console.log(this.employeeForm.value);
    this.employeeForm.reset({fullName: 'asd', gender: '1'})
    this.alert.successSnack('::Submitted successfully');
  }

  get employeeForm() {
    return this.service.form;
  }


  get name() { return this.employeeForm.get('fullName').value; }

  setName(val: String = '') { this.employeeForm.get('fullName').setValue(val); }

  get email() { return this.employeeForm.get('email').value; }

  setEmail() { this.employeeForm.get('email').setValue(''); }

  get mobile() { return this.employeeForm.get('mobile'); }

  setMobile(val: number = 0) { return this.employeeForm.get('mobile').setValue(val); }

  get city() { return this.employeeForm.get('city'); }

  setCity(val: string = '') { this.employeeForm.get('city').setValue(val); }

  get gender() { return this.employeeForm.get('gender'); }

  // setGender(val: number)

  get department() { return this.employeeForm.get('department'); }

  // setDepartment()

  get hireDate() { return this.employeeForm.get('hireDate'); }

  // setHireDate()

  get isPermanent() { return this.employeeForm.get('isPermanent'); }

}
