import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductLocationViewModel } from '../viewModel/product-location.viewmodel';
import { environment } from 'src/environments/environment.development';

const BACKEND_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class LocationGateway {
    private apiUrl = `${BACKEND_URL}/ProductLocation`;

    constructor(private http: HttpClient) { }

    getLocations(): Observable<ProductLocationViewModel[]> {
        return this.http.get<ProductLocationViewModel[]>(this.apiUrl);
    }
}
 