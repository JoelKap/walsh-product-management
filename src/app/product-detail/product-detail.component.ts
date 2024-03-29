import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { ProductService } from '../service/product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { CategoryService } from '../service/category.service';
import { ProductCategoryViewModel } from '../viewModel/product-category.viewmodel';
import { LocationService } from '../service/location.service';
import { ProductLocationViewModel } from '../viewModel/product-location.viewmodel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  categoryName!: string | undefined;
  locationName!: string | undefined;
  product!: ProductViewModel;

  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private locationService: LocationService) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId != null) {
      this.productService.getProductById(productId).subscribe((product) => {
        this.product = product;
        this.getCategories();
        this.getLocations();
      });
    }
  }

  edit() {
    const modalRef = this.modalService.open(ProductModalComponent, {
      size: 'lg'
    });

    modalRef.componentInstance.modalData = { message: 'Update', product: this.product };
    modalRef.componentInstance.saveChanges.subscribe((product: ProductViewModel) => {
      this.productService.editProduct(product).subscribe((product) => {
        this.product = product;
        this.getCategories();
        this.getLocations();
      });
    });
  }

  goBack() {
    this.router.navigate(['/product-list']);
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe((categories: ProductCategoryViewModel[]) => {
      if (categories.length) {
        this.categoryName = categories.find(category => category.categoryId === this.product?.categoryId)?.categoryName;
      }
    })
  }

  private getLocations() {
    this.locationService.getLocations().subscribe((locations: ProductLocationViewModel[]) => {
      if (locations.length) {
        this.locationName = locations.find(location => location.locationId === this.product?.locationId)?.locationName;
      }
    })
  }
}
