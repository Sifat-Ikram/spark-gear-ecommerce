import * as reviewService from "../services/review.service.js";

// Get all
export const getAll = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { productName, reviewerName, review, rating, likes, replies } =
      req.body;
    const updatedProduct = await reviewService.addReview(productName, {
      reviewerName,
      review,
      rating,
      likes,
      replies,
    });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get by productName
export const getByProduct = async (req, res) => {
  try {
    const { productName } = req.params;
    const reviews = await reviewService.getReviewsByProduct(productName);
    if (!reviews) return res.status(404).json({ message: "Product not found" });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const { productName, reviewId } = req.params;
    const updated = await reviewService.deleteReviewById(productName, reviewId);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update review
export const updateReview = async (req, res) => {
  try {
    const { productName, reviewId } = req.params;
    const updated = await reviewService.updateReview(
      productName,
      reviewId,
      req.body
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addLike = async (req, res) => {
  try {
    const { productName } = req.params;
    const { reviewIndex } = req.body;
    const updatedProduct = await reviewService.addLike(
      productName,
      reviewIndex
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addReply = async (req, res) => {
  try {
    const { productName } = req.params;
    const { reviewIndex, replierName, reply } = req.body;
    const updatedProduct = await reviewService.addReply(
      productName,
      reviewIndex,
      {
        name: replierName,
        reply,
      }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
