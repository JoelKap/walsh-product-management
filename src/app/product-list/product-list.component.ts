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
  searchTimer: any;
  searchTerm: string = '';
  products: ProductViewModel[] = [];
  products$ = this.productService.products;

  constructor(private modalService: NgbModal,
    private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
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
