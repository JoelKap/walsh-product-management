import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ProductService } from '../service/product-services.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: ProductViewModel | null;
  faArrowLeft = faArrowLeft;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId != null) {
      this.productService.getProductById(productId).subscribe((product) => {
        console.log(`product result ${JSON.stringify(product)}`);
        this.product = product;
      });
    }
  }

  goBack() {
    this.router.navigate(['/product-list']);
  }
}
