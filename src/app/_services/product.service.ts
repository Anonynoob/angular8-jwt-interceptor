import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Product } from '../_models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  env = environment.localUri;
  form: FormGroup;
  constructor(private http: HttpClient,
    private formBuilder: FormBuilder) { }

  initForm(){
    this.form = this.formBuilder.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required]
    });
  }
  getProducts(){
    return this.http.get(`${this.env}/products`);
  }

  getProduct(productId: String){
    return this.http.get(`${this.env}/products/edit/${productId}`);

  }

}
