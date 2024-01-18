import { Component, OnInit } from '@angular/core';

import { ProductService } from '../service/product-services.service';
import { ProductViewModel } from '../viewModel/product.viewmodel';

@Component({
  selector: 'app-product-trash',
  templateUrl: './product-trash.component.html',
  styleUrls: ['./product-trash.component.css']
})
export class ProductTrashComponent implements OnInit {
  trashProducts$ = this.productService.trashProducts;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadTrashes();
  }

  restoreProduct(product: ProductViewModel) {
    this.productService.restoreTrashProduct(product).subscribe()
  }

  removeProduct(id: number) {
    this.productService.removeTrashProduct(id).subscribe();
  }

  private loadTrashes() {
    this.productService.getTrashProducts().subscribe();
  }
}
