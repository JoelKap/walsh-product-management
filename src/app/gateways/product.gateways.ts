import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { ProductViewModel } from '../viewModel/product.viewmodel';

@Injectable({
    providedIn: 'root'
})
export class ProductGateway {
    private apiUrl = 'https://localhost:7183/api/Product';
    private trashApiUrl = 'https://localhost:7183/api/Trash';

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

    searchProducts(term: string): Observable<ProductViewModel[]> {
        const url = `${this.apiUrl}/searchProducts?searchStr=${term}`;
        return this.http.get<ProductViewModel[]>(url);
    }

    likeOrUnlineProduct(product: ProductViewModel): Observable<ProductViewModel> {
        const url = `${this.apiUrl}/LikeOrUnlikeProduct`;
        return this.http.put<ProductViewModel>(url, product);
    }

    removeProduct(productId: number): Observable<boolean> {
        const url = `${this.apiUrl}/${productId}`;
        return this.http.delete(url).pipe(
            map(() => true), // Map the successful response to true
            catchError(() => {
                // Handle errors if needed
                return of(false);
            })
        );
    }

    getTrashProducts() {
        return this.http.get<ProductViewModel[]>(this.trashApiUrl);
    }

    restoreTrashProduct(product: ProductViewModel): Observable<boolean> {
        const url = `${this.trashApiUrl}/RestoreProduct`;
        return this.http.put<boolean>(url, product);
    }
}
