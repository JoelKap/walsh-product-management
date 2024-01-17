import { ProductCategoryViewModel } from "./product-category.viewmodel";

export class ProductViewModel {
    productId!: number;
    productTitle!: string;
    productPrice!: number;
    productRating?: string;
    productReview?: string;
    productLocation!: string;
    productCategory!: ProductCategoryViewModel;
    productImageUrl? : string;
    productDescription!: string;
    productLike: boolean = false;
  }