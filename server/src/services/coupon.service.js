import couponModel from "../models/coupon.model.js";

export default class CouponService {
  static async getAllCoupons() {
    return await couponModel.find().sort({ createdAt: -1 });
  }

  static async getCouponById(id) {
    return await couponModel.findById(id);
  }

  static async getCouponByCode(code) {
    return await couponModel.findOne({ code: code.toUpperCase() });
  }

  static async addCoupon(data) {
    const coupon = new couponModel(data);
    return await coupon.save();
  }

  static async updateCoupon(id, data) {
    return await couponModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteCoupon(id) {
    return await couponModel.findByIdAndDelete(id);
  }

  static async toggleStatus(id) {
    const coupon = await couponModel.findById(id);
    if (!coupon) return null;
    coupon.isActive = !coupon.isActive;
    return await coupon.save();
  }
}
