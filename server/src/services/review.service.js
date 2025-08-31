import reviewModel from "../models/review.model.js";

class ReviewService {
  async getAll() {
    return await reviewModel.find();
  }

  async getByProductName(productName) {
    return await reviewModel.findOne({ productName });
  }

  async add(productName, reviewData) {
    let productReview = await reviewModel.findOne({ productName });
    if (!productReview) {
      productReview = new reviewModel({ productName, reviews: [] });
    }
    productReview.reviews.push(reviewData);
    return await productReview.save();
  }

  async update(productName, reviewId, updatedData) {
    const productReview = await reviewModel.findOne({ productName });
    if (!productReview) throw new Error("Product not found");

    const review = productReview.reviews.id(reviewId);
    if (!review) throw new Error("Review not found");

    Object.assign(review, updatedData);
    return await productReview.save();
  }

  async delete(productName, reviewId) {
    const productReview = await reviewModel.findOne({ productName });
    if (!productReview) throw new Error("Product not found");

    const review = productReview.reviews.id(reviewId);
    if (!review) throw new Error("Review not found");

    review.deleteOne();
    return await productReview.save();
  }
}

export default new ReviewService();
