import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from '../service/product-services.service';
import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ConfirmationModalComponent } from '../utils/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-product-trash',
  templateUrl: './product-trash.component.html',
  styleUrls: ['./product-trash.component.css']
})
export class ProductTrashComponent implements OnInit {
  trashProducts$ = this.productService.trashProducts;

  constructor(private modalService: NgbModal,
              private productService: ProductService) { }

  ngOnInit() {
    this.loadTrashes();
  }

  restoreProduct(product: ProductViewModel) {
    this.productService.restoreTrashProduct(product).subscribe()
  }

  removeProduct(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      size: 'md'
    });

    modalRef.componentInstance.modalData = { message: 'delete', value: id };
    modalRef.componentInstance.saveChanges.subscribe((id: number) => {
      this.productService.removeTrashProduct(id).subscribe();
    });
  }

  private loadTrashes() {
    this.productService.getTrashProducts().subscribe();
  }
}
