import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

import { LocationGateway } from '../gateways/location.gateways';
import { ProductLocationViewModel } from '../viewModel/product-location.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations: BehaviorSubject<ProductLocationViewModel[]> = new BehaviorSubject<ProductLocationViewModel[]>([]);

  constructor(private toastr: ToastrService,
              private locationGateway: LocationGateway) { }

  getLocations(): Observable<ProductLocationViewModel[]> {
    if (this.locations.value.length) {
      return of(this.locations.value)
    } else {
      return this.locationGateway.getLocations().pipe(
        tap((locations: ProductLocationViewModel[]) => {
          this.locations.next([...this.locations.value, ...locations]);
        }),
        catchError(() => {
          this.toastr.error("Error loading locations", "Error")
          return of([]);
        })
      );
    }
  }
}
