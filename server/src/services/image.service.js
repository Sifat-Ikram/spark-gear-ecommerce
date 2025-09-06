import Product from "../models/product.model.js";

export default class ProductImageService {
  static async addImages(productId, images) {
    if (!images || !Array.isArray(images) || images.length === 0) {
      throw new Error("Images array is required");
    }
    const validImages = images.filter(
      (img) => img.url && img.url.trim() !== ""
    );

    if (validImages.length === 0) {
      throw new Error("No valid images to add");
    }

    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    product.images.push(...validImages);
    return await product.save();
  }
}
