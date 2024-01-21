import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductCategoryViewModel } from '../viewModel/product-category.viewmodel';
import { environment } from 'src/environments/environment.development';

const BACKEND_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class CategoryGateway {
    private apiUrl = `${BACKEND_URL}/ProductCategory`;

    constructor(private http: HttpClient) { }

    getCategories(): Observable<ProductCategoryViewModel[]> {
        return this.http.get<ProductCategoryViewModel[]>(this.apiUrl);
    }
}
