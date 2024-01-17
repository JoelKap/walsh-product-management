import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductLocationViewModel } from '../viewModel/product-location.viewmodel';

@Injectable({
    providedIn: 'root'
})
export class LocationGateway {
    private apiUrl = 'https://localhost:7183/api/Location';

    constructor(private http: HttpClient) { }

    getLocations(): Observable<ProductLocationViewModel[]> {
        return this.http.get<ProductLocationViewModel[]>(this.apiUrl);
    }
}
 