import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, OperatorFunction, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ProductService } from '../service/product-services.service';

@Component({
  selector: 'app-product-global-search',
  templateUrl: './product-global-search.component.html',
  styleUrls: ['./product-global-search.component.css']
})
export class ProductGlobalSearchComponent implements OnInit {
  searchForm!: FormGroup;
  faSearch = faSearch;

  suggestions$: OperatorFunction<string, ProductViewModel[]> | null = null;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService) { }

  ngOnInit() {
    this.createProductFormBuilder();
    this.setupTypeahead();
  }

  private setupTypeahead(): void {
    // Use debounceTime, distinctUntilChanged, and switchMap to control the frequency of API requests
    this.suggestions$ = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200), // wait 200ms after each keystroke before considering the term
        distinctUntilChanged(), // ignore if next search term is same as previous
        switchMap((term) =>
          this.productService.searchProducts(term).pipe(
            catchError(() => of([])) //Todo::find a better way to handle the error
          )
        )
      );
  }

  private createProductFormBuilder() {
    this.searchForm = this.formBuilder.group({
      searchStr: [''],
    });
  }
}
