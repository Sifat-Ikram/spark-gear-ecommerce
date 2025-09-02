import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: false },
    userName: { type: String, required: false },
    quantity: { type: Number, default: 1 },
    cart: {
      image: { type: String, required: true },
      name: { type: String, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      sku: { type: String, required: true },
      stock: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartItemSchema);

export default Cart;
