import reviewService from "../services/review.service.js";


class ReviewController {
  async getAll(req, res) {
    try {
      const reviews = await reviewService.getAll();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByProductName(req, res) {
    try {
      const { productName } = req.params;
      const reviews = await reviewService.getByProductName(productName);
      if (!reviews)
        return res.status(404).json({ message: "No reviews found" });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async add(req, res) {
    try {
      const { productName } = req.params;
      const review = await reviewService.add(productName, req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { productName, reviewId } = req.params;
      const review = await reviewService.update(
        productName,
        reviewId,
        req.body
      );
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { productName, reviewId } = req.params;
      const result = await reviewService.delete(productName, reviewId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ReviewController();
