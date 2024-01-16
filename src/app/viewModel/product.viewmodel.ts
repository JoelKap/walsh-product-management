export class ProductViewModel {
    productId!: number;
    productTitle!: string;
    productPrice!: number;
    productRating?: string;
    productReview?: string;
    productLocation!: string;
    productCategory!: string;
    productImageUrl? : string;
    productDescription!: string;
    productLike: boolean = false;
  }