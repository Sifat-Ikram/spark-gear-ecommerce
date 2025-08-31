import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    reply: { type: String },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      name: { type: String, required: true },
      image: { type: String },
    },
    review: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    replies: [replySchema],
  },
  { timestamps: true }
);

const productReview = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Review", productReview);
