import { Component, OnInit } from '@angular/core';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ProductService } from '../service/product-services.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductViewModel[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
