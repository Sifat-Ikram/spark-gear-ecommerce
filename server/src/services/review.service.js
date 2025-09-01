import Review from "../models/review.model.js";

export const getAllReviews = async () => {
  return await Review.find();
};

export const addReview = async (productName, reviewData) => {
  let product = await Review.findOne({ productName });
  if (!product) {
    product = new Review({
      productName,
      review: [],
      averageRating: 0,
    });
  }

  product.review.push({
    reviewer: { name: reviewData.reviewerName },
    review: reviewData.review,
    rating: reviewData.rating || 0,
    likes: reviewData.likes || 0,
    replies: [],
  });

  await product.save();
  return product;
};

export const getReviewsByProduct = async (productName) => {
  return await Review.findOne({ productName });
};

export const deleteReviewById = async (productName, reviewId) => {
  return await Review.findOneAndUpdate(
    { productName },
    { $pull: { review: { _id: reviewId } } },
    { new: true }
  );
};

export const updateReview = async (productName, reviewId, updatedData) => {
  return await Review.findOneAndUpdate(
    { productName, "review._id": reviewId },
    {
      $set: {
        "review.$.review": updatedData.review,
        "review.$.rating": updatedData.rating,
        "review.$.likes": updatedData.likes,
      },
    },
    { new: true }
  );
};

export const addLike = async (productName, reviewIndex) => {
  const product = await Review.findOne({ productName });
  if (!product || !product.review[reviewIndex]) {
    throw new Error("Review not found");
  }
  product.review[reviewIndex].likes =
    (product.review[reviewIndex].likes || 0) + 1;
  await product.save();
  return product;
};

export const addReply = async (productName, reviewIndex, reply) => {
  const product = await Review.findOne({ productName });
  if (!product || !product.review[reviewIndex]) {
    throw new Error("Review not found");
  }
  product.review[reviewIndex].replies.push(reply);
  await product.save();
  return product;
};
