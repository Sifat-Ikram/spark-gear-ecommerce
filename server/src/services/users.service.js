import { User } from "../models/user.model.js";

export default class UserServices {
  static async getAllUsers() {
    return await User.find().select("-password").sort({ createdAt: -1 });
  }

  static async getUserByEmail(email) {
    return await User.findOne({ email }).select("-password");
  }

  static async updateUser(userId, updatedData) {
    if (updatedData.password) {
      delete updatedData.password;
    }
    return User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    }).select("-password");
  }

  static async deleteUser(userId) {
    return await User.findByIdAndDelete(userId).select("-password");
  }

  static async updateUserRole(userId, role) {
    return await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select("-password");
  }
}
