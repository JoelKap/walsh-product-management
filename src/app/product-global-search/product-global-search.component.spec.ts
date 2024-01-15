import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGlobalSearchComponent } from './product-global-search.component';

describe('ProductGlobalSearchComponent', () => {
  let component: ProductGlobalSearchComponent;
  let fixture: ComponentFixture<ProductGlobalSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductGlobalSearchComponent]
    });
    fixture = TestBed.createComponent(ProductGlobalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
