import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductCategoryViewModel } from '../viewModel/product-category.viewmodel';

@Injectable({
    providedIn: 'root'
})
export class CategoryGateway {
    private apiUrl = 'https://localhost:7183/api/Category';

    constructor(private http: HttpClient) { }

    getCategories(): Observable<ProductCategoryViewModel[]> {
        return this.http.get<ProductCategoryViewModel[]>(this.apiUrl);
    }
}
