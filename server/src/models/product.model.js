import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true, trim: true },
  alt: { type: String, trim: true },
});

const specSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true },
});

const ratingsSchema = new mongoose.Schema({
  average: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    sku: { type: String, required: true, trim: true, unique: true },
    brand: { type: String, trim: true },
    category: { type: String, trim: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    shortDescription: { type: String, trim: true },
    description: { type: String, trim: true },
    images: [imageSchema],
    stock: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    ratings: ratingsSchema,
    releaseDate: { type: Date },
    specs: [specSchema],
    warranty: { type: String, trim: true },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
