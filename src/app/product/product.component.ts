import { Component, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { ProductViewModel } from '../viewModel/product.viewmodel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  faThumbsUp = faThumbsUp;
  
  @Input() product!: ProductViewModel;

  viewProductDetails(id: number){

  }

  likeProduct(id: number){

  }

  removeProduct(id: number){
    
  }
}
