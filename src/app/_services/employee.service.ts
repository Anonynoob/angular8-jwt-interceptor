import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Employee } from '@_models';
import { environment } from '../../environments';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  env = environment.localUri;
  private editEmp: any;
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: Router) {
    if (this.editEmp !== null || this.editEmp !== '') { this.route.navigate(['/employee']); }
  }
  form: FormGroup;
  // form: FormGroup = new FormGroup({
  //   $key: new FormControl(null),
  //   fullName: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.email),
  //   mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]),
  //   city: new FormControl(''),
  //   gender: new FormControl('1'),
  //   department: new FormControl(0),
  //   hireDate: new FormControl(''),
  //   isPermanent: new FormControl(false)
  // });

  setEmp(v) {
    this.editEmp = v;
  }


  public get getEmp(): string {
    return this.editEmp;
  }


  initForm() {
    console.log(this.editEmp);
    if (this.editEmp) {
      this.form = this.formBuilder.group({
        $key: this.editEmp.$key,
        fullName: [this.editEmp.fullName, Validators.required],
        email: [this.editEmp.email, Validators.email],
        mobile: [this.editEmp.mobile, Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')])],
        city: [this.editEmp.city],
        gender: [this.editEmp.gender === 'Male'? "1" : this.editEmp.gender.includes('female') ? "2" : "3"],
        department: [2],
        hireDate: [this.editEmp.hireDate],
        isPermanent: [this.editEmp.isPermanent]
      });
    } else {
      this.form = this.formBuilder.group({
        $key: null,
        fullName: ['', Validators.required],
        email: ['', Validators.email],
        mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')])],
        city: [''],
        gender: [1],
        department: [0],
        hireDate: [''],
        isPermanent: [false]
      });
    }
  }
  /**
   * ! deprecated
   * currently unused
   */
  initFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: 1,
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }
  initFormGroupWControl() {
    this.form = new FormGroup({
      $key: new FormControl(null),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]),
      city: new FormControl(''),
      gender: new FormControl('1'),
      department: new FormControl(2),
      hireDate: new FormControl(''),
      isPermanent: new FormControl(false)
    });
  }


  getEmployees() {
    return this.http.get(`${this.env}/employees`);
  }

  getFakeEmployees() {
    const emp: Employee[] = [
      {
        $key: "5d3f2f3fcc6748ba3e8e13cf",
        isPermanent: false,
        fullName: "Jordan Perry",
        gender: "male",
        email: "jordanperry@vitricomp.com",
        mobile: "(875) 503-3983",
        department: 2,
        hireDate: "2017-05-19T07:37:46 -07:00"
      },
      {
        $key: "5d3f2fbce182bd1dfd6a15ca",
        isPermanent: true,
        fullName: "Amber Howell",
        gender: "female",
        email: "amberhowell@vitricomp.com",
        mobile: "(961) 539-3171",
        department: 2,
        hireDate: "2014-07-10T12:04:12 -07:00"
      },
      {
        $key: "5d3f2fc7f78140d025a054d7",
        isPermanent: false,
        fullName: "Henson Tyson",
        gender: "male",
        email: "hensontyson@vitricomp.com",
        mobile: "(801) 438-3854",
        department: 2,
        hireDate: "2019-04-09T10:04:42 -07:00"
      },
      {
        $key: "5d3f2fd45b3c915bb19b8e98",
        isPermanent: false,
        fullName: "April Patterson",
        gender: "female",
        email: "aprilpatterson@vitricomp.com",
        mobile: "(914) 538-3857",
        department: 3,
        hireDate: "2014-01-18T05:48:45 -07:00"
      }
    ];
    return emp;
  }

  saveEmployee(obj: String[]) {
    return this.http.post(`${this.env}/employees`, obj);
  }
}
