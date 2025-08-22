import Product from "../models/product.model.js";


export default class ProductService {
  static async getAllProducts() {
    return await Product.find().sort({ createdAt: -1 });
  }

  static async addProduct(data) {
    const product = new Product(data);
    return await product.save();
  }

  static async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }

  static async getProductById(id) {
    return await Product.findById(id);
  }

  // Get a product by slug
//   static async getProductBySlug(slug) {
//     return await Product.findOne({ slug });
//   }

}
