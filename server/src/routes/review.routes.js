import express from "express";
import * as reviewController from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", reviewController.addReview);
router.get("/", reviewController.getAll);
router.get("/:productName", reviewController.getByProduct);
router.delete("/:productName/:reviewId", reviewController.deleteReview);
router.put("/:productName/:reviewId", reviewController.updateReview);
router.patch("/:productName/like", reviewController.addLike);
router.patch("/:productName/reply", reviewController.addReply);

export default router;
