import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    reply: { type: String, required: true },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      name: { type: String, required: true },
    },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    replies: [replySchema],
  },
  { timestamps: true }
);

const productReviewSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    review: [reviewSchema],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Review", productReviewSchema);
