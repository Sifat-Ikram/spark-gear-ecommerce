import { User } from "../models/user.model.js";

export default class UserServices {
  static async getAllUsers() {
    return await User.find().select("-password").sort({ createdAt: -1 });
  }

  static async getUserById(userId) {
    return await User.findById(userId).select("-password");
  }

  static async updateProfile(userId, profileData) {
    // Only allow user profile fields
    const allowedFields = ["name", "email", "phone", "city", "address"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (profileData[field] !== undefined) {
        updates[field] = profileData[field];
      }
    });

    return await User.findByIdAndUpdate(userId, updates, {
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
