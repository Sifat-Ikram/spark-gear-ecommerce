import {
  addCartService,
  deleteCartByEmailService,
  deleteCartService,
  getCartByEmailService,
  getCartService,
  updateCartService,
} from "../services/cart.service.js";

export const addToCart = async (req, res) => {
  try {
    const result = await addCartService(req.body);
    res.status(201).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: err.message });
  }
};

export const getAllCart = async (req, res) => {
  try {
    const carts = getCartService();
    res.json(carts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting carts", error: err.message });
  }
};

export const getCartByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const cart = await getCartByEmailService(email);
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching cart by email", error: err.message });
  }
};

export const updatCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const result = await updateCartService(id, action);
    if (!result) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: err.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCartService(id);
    res.json({ message: "Cart deleted successfully!", result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting cart", error: err.message });
  }
};

export const deleteCartByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await deleteCartByEmailService(email);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No cart items found for this user" });
    }

    res.json({ message: "All cart items deleted successfully!", result });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user's cart",
      error: err.message,
    });
  }
};
