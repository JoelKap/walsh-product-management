import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ProductService } from '../service/product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductViewModel[] = [];
  products$ = this.productService.products;

  constructor(private modalService: NgbModal,
    private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  searchProducts(value: any) {
    if (value.data) {
      const term = value.data.trim();
      this.productService.searchProducts(term).subscribe(
        (products: ProductViewModel[]) => {
          this.products$.next(products);
          this.productService.productCount$.next(this.products$.value.length);
          if (this.productService.productsCount !== this.products$.value.length) {
            this.productService.isProductLengthChanged$.next(true);
          }
        }
      );
    } else {
      this.loadProducts();
    }
  }

  addProduct() {
    const modalRef = this.modalService.open(ProductModalComponent, {
      size: 'lg'
    });

    const newProduct = new ProductViewModel();
    newProduct.productId = 0;
    newProduct.productReview = '';
    newProduct.productInStock = "IN";
    modalRef.componentInstance.modalData = { message: 'Add', product: newProduct };

    modalRef.componentInstance.saveChanges.subscribe((product: ProductViewModel) => {
      this.productService.addProduct(product).subscribe();
    });
  }

  private loadProducts() {
    this.productService.getProducts().subscribe();
  }
}
