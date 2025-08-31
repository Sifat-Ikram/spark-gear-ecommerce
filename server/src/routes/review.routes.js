import express from "express";
import reviewController from "../controllers/review.controller.js";

const router = express.Router();

// Get all product reviews
router.get("/", (req, res) => reviewController.getAll(req, res));

// Get reviews by product name
router.get("/:productName", (req, res) =>
  reviewController.getByProductName(req, res)
);

// Add review to product
router.post("/:productName", (req, res) => reviewController.add(req, res));

// Update review
router.put("/:productName/:reviewId", (req, res) =>
  reviewController.update(req, res)
);

// Delete review
router.delete("/:productName/:reviewId", (req, res) =>
  reviewController.delete(req, res)
);

export default router;
