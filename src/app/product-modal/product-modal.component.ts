import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductViewModel } from '../viewModel/product.viewmodel';
import { touchAllFormFields } from '../utils/validation';
import { ProductCategoryViewModel } from '../viewModel/product-category.viewmodel';
import { CategoryService } from '../service/category.service';
import { LocationService } from '../service/location.service';
import { ProductLocationViewModel } from '../viewModel/product-location.viewmodel';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  @Input() modalData!: any;
  @Input() title: string = '';

  @Output() saveChanges = new EventEmitter<ProductViewModel>();

  productForm!: FormGroup;
  categories: ProductCategoryViewModel[] = [];
  locations: ProductLocationViewModel[] = [];

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private locationService: LocationService) { }

  ngOnInit() {
    this.createProductFormBuilder();
    this.patchProductValues();
    this.getCategories();
    this.getLocations();
  }

  onSaveChanges() {
    if (!this.productForm.valid) {
      touchAllFormFields(this.productForm);
      return;
    }

    this.modalData.product = { ...this.modalData.product, ...this.productForm.value };

    this.productForm.setValue(this.modalData.product);
    this.saveChanges.emit(this.modalData.product);
    this.activeModal.close();
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe((categories: ProductCategoryViewModel[]) => {
      if (categories.length) {
        this.categories = categories;
      }
    })
  }

  private getLocations() {
    this.locationService.getLocations().subscribe((locations: ProductLocationViewModel[]) => {
      if (locations.length) {
        this.locations = locations;
      }
    })
  }

  private createProductFormBuilder() {
    this.productForm = this.formBuilder.group({
      productId: [0],
      categoryId: ['', Validators.required],
      productReview: [''],
      productLike: [false, Validators.required],
      productImageUrl: ['', Validators.required],
      locationId: ['', Validators.required],
      productInStock: ['IN', Validators.required],
      productRating: [1, [Validators.min(1), Validators.max(5)]],
      productTitle: ['', [Validators.required, Validators.maxLength(50)]],
      productDescription: ['', [Validators.required, Validators.minLength(150)]],
      productPrice: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
    });
  }

  private patchProductValues() {
    this.productForm.patchValue({
      productReview: this.modalData.product.productReview,
      productLike: this.modalData.product.productLike,
      productImageUrl: this.modalData.product.productImageUrl,
      locationId: this.modalData.product.locationId,
      productInStock: this.modalData.product.productInStock,
      productRating: this.modalData.product.productRating,
      productTitle: this.modalData.product.productTitle,
      productDescription: this.modalData.product.productDescription,
      productPrice: this.modalData.product.productPrice,
      productId: this.modalData.product.productId,
      categoryId: this.modalData.product.categoryId,
    });
  }
}
