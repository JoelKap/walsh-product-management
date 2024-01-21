import { ProductReviewViewModel } from "./product-review.model";
import { ProductStockViewModel } from "./product-stock.viewmodel";

export class ProductViewModel {
    productId!: number;
    categoryId!: number;
    locationId!: number;
    productTitle!: string;
    productPrice!: number;
    productRating?: string;
    productReview?: string;
    productInStock!: string;
    productImageUrl? : string;
    productDescription!: string;
    productLike: boolean = false;
    stock!: ProductStockViewModel;
    reviews!: ProductReviewViewModel[]
  }