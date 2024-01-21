import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationService } from '../service/location.service';

import { ProductService } from '../service/product.service';
import { ProductLocationViewModel } from '../viewModel/product-location.viewmodel';

export type CheckboxFilter = {
  id: number;
  name: string;
  isChecked: boolean;
};

@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.css']
})
export class GlobalFilterComponent implements OnInit {  
  @Input() filters!: CheckboxFilter[];
  @Output() filterChange: EventEmitter<CheckboxFilter> = new EventEmitter<CheckboxFilter>();
  locations: ProductLocationViewModel[] = [];

  constructor(private locationService: LocationService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.getLocations();
  }

  private getLocations() {
    this.locationService.getLocations().subscribe((locations: ProductLocationViewModel[]) => {
      if (locations.length) {
        this.filters = locations.map(location => ({
          id: location.locationId,
          name: location.locationName,
          isChecked: false
        }));
      }
    });
  }

  onCheckboxChange(filter: CheckboxFilter) {
    filter.isChecked = !filter.isChecked;
    this.productService.filter(filter.id).subscribe(() => {
      const noMoreChecked = this.filters.every(f => !f.isChecked);
      
      if (noMoreChecked) {
        this.productService.products.next([]);
        this.productService.getProducts().subscribe();
      }
    });
  }
}
