import { Component, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { ProductViewModel } from '../viewModel/product.viewmodel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  faThumbsUp = faThumbsUp;
  @Input() product!: ProductViewModel;

  constructor(private router: Router){

  }

  viewProductDetails(id: number){
    this.router.navigate(['/detail', id]);
  }

  likeProduct(id: number){
  }

  removeProduct(id: number){
  }
}
