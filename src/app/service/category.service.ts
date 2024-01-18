import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

import { CategoryGateway } from '../gateways/category.gateways';
import { ProductCategoryViewModel } from '../viewModel/product-category.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: BehaviorSubject<ProductCategoryViewModel[]> = new BehaviorSubject<ProductCategoryViewModel[]>([]);

  constructor(private toastr: ToastrService,
              private categoryGateway: CategoryGateway) { }

  getCategories(): Observable<ProductCategoryViewModel[]> {
    if (this.categories.value.length) {
      return of(this.categories.value)
    } else {
      return this.categoryGateway.getCategories().pipe(
        tap((categories: ProductCategoryViewModel[]) => {
          this.categories.next([...this.categories.value, ...categories]);
        }),
        catchError(() => {
          this.toastr.error("Error loading cateogries", "Error")
          return of([]);
        })
      );
    }
  }
}
