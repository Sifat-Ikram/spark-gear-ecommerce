import Category from "../models/category.model.js";

export default class CategoryService {
  static async getAllCategories() {
    return await Category.find().sort({ createdAt: -1 });
  }

  static async addCategory(data) {
    const category = new Category(data);
    return await category.save();
  }

  static async updateCategory(id, data) {
    return await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteCategory(id) {
    return await Category.findByIdAndDelete(id);
  }

  static async getCategoryById(id) {
    return await Category.findById(id);
  }

  static async getCategoryByName(name) {
    return await Category.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });
  }
}
