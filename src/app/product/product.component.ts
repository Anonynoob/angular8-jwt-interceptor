import { Component, OnInit } from '@angular/core';
import { Product } from '@_models'
import { ProductService, AlertService } from '@_services';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  error: String;
  constructor(private service: ProductService, private alert: AlertService) { }

  ngOnInit() {
    console.log('init prod');
    this.service.getProducts()
    .subscribe((res: Product[]) => {
      console.log(res);
      this.products = res;
    },
    error => {
      // this.error = error;
      // this.alert.error(this.error);
    });
  }

}
