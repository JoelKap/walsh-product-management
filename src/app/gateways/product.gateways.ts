import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProductViewModel } from '../viewModel/product.viewmodel';

@Injectable({
    providedIn: 'root'
})
export class ProductGateway {
    private apiUrl = 'https://localhost:7183/api/Product';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<ProductViewModel[]> {
        return this.http.get<ProductViewModel[]>(this.apiUrl);
    }

    getProductById(productId: number): Observable<ProductViewModel> {
        const url = `${this.apiUrl}/${productId}`;
        return this.http.get<ProductViewModel>(url);
    }

    addProduct(product: ProductViewModel): Observable<ProductViewModel> {
        return this.http.post<ProductViewModel>(this.apiUrl, product);
    }

    updateProduct(product: ProductViewModel): Observable<ProductViewModel> {
        const url = `${this.apiUrl}`;
        return this.http.put<ProductViewModel>(url, product);
    }
}
