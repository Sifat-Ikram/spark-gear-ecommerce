import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cart: {
      image: { type: String, required: true },
      name: { type: String, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      sku: { type: String, required: true },
    },
    quantity: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    cart: [cartItemSchema],
    shippingFee: { type: Number, required: true },
    orderTotal: { type: Number, required: true },
    paymentInfo: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
