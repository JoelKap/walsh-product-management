import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
