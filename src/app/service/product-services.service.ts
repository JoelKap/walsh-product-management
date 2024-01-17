import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, of, tap } from 'rxjs';

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

  getProductById(id: string): Observable<ProductViewModel | null> {
    const productId = Number(id);
    const cachedProduct = this.products.value.find(product => product.productId === productId);

    if (cachedProduct) {
      return of(cachedProduct);
    } else {
      return this.productGateway.getProductById(productId).pipe(
        filter((product: ProductViewModel | null): product is ProductViewModel => product !== null),
        tap((product: ProductViewModel) => {
          this.products.next([...this.products.value, product]);
        }),
        catchError((error) => {
          // Todo: Handle error, e.g., show notification
          console.error(`Error loading product with productId ${productId}`, error);
          return of(null);
        })
      );
    }
  }

  addOrUpdateProduct(product: ProductViewModel) {
    if (product.productId) {
      return this.productGateway.updateProduct(product);
    } else {
      return this.productGateway.addProduct(product);
    }
  }
}
