import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@_services';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: any = {};
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: ProductService) { this.service.initForm(); }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.getProduct(params['id']).subscribe( res =>{
        this.product = res;
        this.service.form.patchValue({
          ProductName: this.product.ProductName,
          ProductDescription: this.product.ProductDescription,
          ProductPrice: this.product.ProductPrice
        })
      })
    });
  }

}
