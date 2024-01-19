export class ProductReviewViewModel {
    reviewId!: number;
    productId!: number;
    productRating!: number;
    productReview?: string;
    isDeleted!: boolean;
    createdAt!: Date;
    updateAt!: number;
}