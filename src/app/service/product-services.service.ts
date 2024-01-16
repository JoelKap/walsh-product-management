import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ProductGateway } from '../gateways/product.gateways';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: BehaviorSubject<ProductViewModel[]> = new BehaviorSubject<ProductViewModel[]>([]);

  constructor(private productGateway: ProductGateway) { }

  getProducts(): Observable<ProductViewModel[]> {
    if (this.products.value.length) {
      return of(this.products.value)
    } else {
      return this.productGateway.getProducts().pipe(
        tap((products: ProductViewModel[]) => {
          this.products.next([...this.products.value, ...products]);
        }),
        catchError(error => {
          //Todo:Need to load a notification
          //console.error('Error loading products', error);
          return of([]);
        })
      );
    }
  }
}
