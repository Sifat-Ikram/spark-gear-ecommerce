import Cart from "../models/cart.model.js";

export const addCartService = async (cartData) => {
  const { userEmail, userName, cart } = cartData;

  const existingProduct = await Cart.findOne({
    userEmail: userEmail || null,
    "cart.name": cart.name,
  });

  if (existingProduct) {
    existingProduct.quantity += 1;
    return await existingProduct.save();
  }

  const newCart = new Cart({
    ...cartData,
    quantity: 1,
    userEmail: userEmail || null,
    userName: userName || null,
  });
  return await newCart.save();
};

export const getCartService = async () => {
  return await Cart.find();
};

export const getCartByEmailService = async (email) => {
  return await Cart.find({ userEmail: email });
};

export const updateCartService = async (id, action) => {
  const cartItem = await Cart.findById(id);
  console.log(cartItem);
  
  if (!cartItem) {
    return null;
  }
  if (action === "increase") {
    cartItem.quantity += 1;
  } else if (action === "decrease" && cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  }

  return await cartItem.save();
};

export const deleteCartService = async (id) => {
  return await Cart.findByIdAndDelete(id);
};
