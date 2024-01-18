import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, of, switchMap, tap } from 'rxjs';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ProductGateway } from '../gateways/product.gateways';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: BehaviorSubject<ProductViewModel[]> = new BehaviorSubject<ProductViewModel[]>([]);
  trashProducts: BehaviorSubject<ProductViewModel[]> = new BehaviorSubject<ProductViewModel[]>([]);

  constructor(private toastr: ToastrService,
              private productGateway: ProductGateway) { }

  getProducts(): Observable<ProductViewModel[]> {
    if (this.products.value.length) {
      return of(this.products.value)
    } else {
      return this.productGateway.getProducts().pipe(
        tap((products: ProductViewModel[]) => {
          this.products.next([...this.products.value, ...products]);
        }),
        catchError(() => {
          this.toastr.error("Error loading products", "Error")
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
        catchError(() => {
          this.toastr.error("Error loading product", "Error")
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

  searchProducts(term: string) {
    const cachedProducts = this.products.value.filter(product =>
      this.productMatchesSearchTerm(product, term)
    );

    if (cachedProducts.length > 0) {
      return of(cachedProducts);
    } else {
      return this.productGateway.searchProducts(term).pipe(
        tap((products: ProductViewModel[]) => {
          this.products.next([...this.products.value, ...products]);
        }),
        catchError(error => {
          console.error('Error searching products', error);
          return of([]);
        })
      );
    }
  }

  likeOrUnlikeProduct(product: ProductViewModel): Observable<ProductViewModel | null> {
    return this.productGateway.likeOrUnlineProduct(product).pipe(
      tap((product: ProductViewModel) => {
        this.products.next([...this.products.value, product]);
      }),
      catchError(() => {
        this.toastr.error("Error updating product", "Error")
        return of(null);
      })
    );
  }

  removeProduct(id: number): Observable<boolean> {
    const cachedProductIndex = this.products.value.findIndex(product => product.productId === id);

    if (cachedProductIndex !== -1) {
      this.products.value.splice(cachedProductIndex, 1);
    }

    return this.productGateway.removeProduct(id).pipe(
      switchMap(() => of(true)),
      catchError(() => {
        return of(false);
      })
    );
  }

  getTrashProducts() {
    if (this.trashProducts.value.length) {
      return of(this.trashProducts.value)
    } else {
      return this.productGateway.getTrashProducts().pipe(
        tap((trashProducts: ProductViewModel[]) => {
          this.trashProducts.next([...this.trashProducts.value, ...trashProducts]);
        }),
        catchError(() => {
          this.toastr.error("Error loading trash products", "Error")
          return of([]);
        })
      );
    }
  }

  restoreTrashProduct(model: ProductViewModel) {
    return this.productGateway.restoreTrashProduct(model).pipe(
      tap((result: boolean) => {
        if (result) {
          const cachedProductIndex = this.trashProducts.value.findIndex(product => product.productId === model.productId);
          if (cachedProductIndex !== -1) {
            const updatedTrashProducts = [
              ...this.trashProducts.value.slice(0, cachedProductIndex),
              ...this.trashProducts.value.slice(cachedProductIndex + 1)
            ];
            this.trashProducts.next(updatedTrashProducts);
          }
        }
      }),
      catchError((error) => {
        console.error(`Error restoring product with productId`, error);
        return of(false);
      })
    );
  }

  removeTrashProduct(id: number) {
    return this.productGateway.removeTrashProduct(id).pipe(
      tap((result: boolean) => {
        if (result) {
          const cachedProductIndex = this.trashProducts.value.findIndex(product => product.productId === id);
          if (cachedProductIndex !== -1) {
            const updatedTrashProducts = [
              ...this.trashProducts.value.slice(0, cachedProductIndex),
              ...this.trashProducts.value.slice(cachedProductIndex + 1)
            ];
            this.trashProducts.next(updatedTrashProducts);
          }
        }
      }),
      catchError((error) => {
        console.error(`Error restoring product with productId`, error);
        return of(false);
      })
    );
  }


  private productMatchesSearchTerm(product: ProductViewModel, term: string): boolean {
    return (
      product.productTitle.toLowerCase().includes(term.toLowerCase()) ||
      product.productDescription.toLowerCase().includes(term.toLowerCase()) ||
      product.productPrice.toString() == term
    );
  }
}
