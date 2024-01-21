import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-global-search',
  templateUrl: './product-global-search.component.html',
  styleUrls: ['./product-global-search.component.css']
})
export class ProductGlobalSearchComponent {
  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private productService: ProductService) { }

  handleSearchInput(): void {
    this.productService.searchProducts(this.searchTerm).subscribe(
      (products: ProductViewModel[]) => {
        this.productService.productCount$.next(products.length);
        if (this.productService.productsCount !== products.length) {
          this.productService.isProductLengthChanged$.next(true);
        }
      }
    );
  }
}
