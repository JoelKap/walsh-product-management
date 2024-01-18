import { Component, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ProductService } from '../service/product-services.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  faThumbsUp = faThumbsUp;
  @Input() product!: ProductViewModel;

  constructor(private router: Router,
    private productService: ProductService) {

  }

  viewProductDetails(id: number) {
    this.router.navigate(['/detail', id]);
  }

  likeOrUnlikeProduct(product: ProductViewModel) {
    product.productLike = !product.productLike;

    this.productService.likeOrUnlikeProduct(product).subscribe((result) => {
      product.productLike = !result?.productLike;
    })
  }

  removeProduct(id: number) {
    this.productService.removeProduct(id).subscribe(() => {});
  }
}
