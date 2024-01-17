import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

import { LocationGateway } from '../gateways/location.gateways';
import { ProductLocationViewModel } from '../viewModel/product-location.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations: BehaviorSubject<ProductLocationViewModel[]> = new BehaviorSubject<ProductLocationViewModel[]>([]);

  constructor(private locationGateway: LocationGateway) { }

  getLocations(): Observable<ProductLocationViewModel[]> {
    if (this.locations.value.length) {
      return of(this.locations.value)
    } else {
      return this.locationGateway.getLocations().pipe(
        tap((locations: ProductLocationViewModel[]) => {
          this.locations.next([...this.locations.value, ...locations]);
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
