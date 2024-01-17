import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

import { CategoryGateway } from '../gateways/category.gateways';
import { ProductCategoryViewModel } from '../viewModel/product-category.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: BehaviorSubject<ProductCategoryViewModel[]> = new BehaviorSubject<ProductCategoryViewModel[]>([]);

  constructor(private categoryGateway: CategoryGateway) { }

  getCategories(): Observable<ProductCategoryViewModel[]> {
    if (this.categories.value.length) {
      return of(this.categories.value)
    } else {
      return this.categoryGateway.getCategories().pipe(
        tap((categories: ProductCategoryViewModel[]) => {
          this.categories.next([...this.categories.value, ...categories]);
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
