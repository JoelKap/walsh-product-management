import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductViewModel } from '../viewModel/product.viewmodel';
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
    const productData = this.productForm.value;
    const reviewsArray: any[] = [];
    reviewsArray.push(productData.reviews);

    productData.reviews = reviewsArray;
    if (productData.productId == undefined || productData.productId < 0) {
      productData.categoryId = Number(this.productForm.value.categoryId);
      productData.locationId = Number(this.productForm.value.locationId);
    }

    this.saveChanges.emit(productData);
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
      categoryId: [0, Validators.required],
      productLike: [false, Validators.required],
      productImageUrl: ['', Validators.required],
      locationId: [0, Validators.required],
      productTitle: ['', [Validators.required, Validators.maxLength(50)]],
      productDescription: ['', [Validators.required, Validators.minLength(150)]],
      productPrice: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
      isDeleted: [false],
      createdAt: [new Date()],
      updateAt: [new Date()],
      reviews: this.formBuilder.group({
        reviewId: [0],
        productId: [0],
        productRating: [''],
        productReviewDescription: ['Demo'],
        isDeleted: [false],
        createdAt: [new Date()],
        updateAt: [new Date()],
      }),
      stock: this.formBuilder.group({
        stockId: [0],
        productInStock: ['IN'],
        isDeleted: [false],
        createdAt: [new Date()],
        updateAt: [new Date()],
      }),
    });
  }

  private patchProductValues() {
    const { product } = this.modalData;

    if (product) {
      const { reviews, stock, ...restProduct } = product;

      this.productForm.patchValue({
        ...restProduct,
        reviews: reviews && reviews.length > 0 ? reviews[0] : null,
        stock: stock || null,
      });
    }
  }
}
