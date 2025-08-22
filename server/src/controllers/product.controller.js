import ProductService from "../services/product.service.js";

export default class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async addProduct(req, res) {
    try {
      const product = await ProductService.addProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await ProductService.updateProduct(
        req.params.id,
        req.body
      );
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const product = await ProductService.deleteProduct(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //   static async getProductBySlug(req, res) {
  //     try {
  //       const product = await ProductService.getProductBySlug(req.params.slug);
  //       if (!product)
  //         return res.status(404).json({ message: "Product not found" });
  //       res.json(product);
  //     } catch (error) {
  //       res.status(500).json({ message: error.message });
  //     }
  //   }
}
