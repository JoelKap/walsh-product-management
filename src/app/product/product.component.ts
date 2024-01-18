import { Component, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ProductService } from '../service/product-services.service';
import { ConfirmationModalComponent } from '../utils/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  faThumbsUp = faThumbsUp;
  @Input() product!: ProductViewModel;

  constructor(private router: Router,
    private modalService: NgbModal,
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
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      size: 'md'
    });

    modalRef.componentInstance.modalData  = {message: 'delete', value: id};
    modalRef.componentInstance.saveChanges.subscribe((id: number) => {
      this.productService.removeProduct(id).subscribe(() => { });
    });
  }
}
