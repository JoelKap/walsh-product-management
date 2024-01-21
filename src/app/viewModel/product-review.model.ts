export class ProductReviewViewModel {
    reviewId!: number;
    productId!: number;
    productRating!: number;
    productReviewDescription?: string;
    isDeleted!: boolean;
    createdAt!: Date;
    updateAt!: number;
}