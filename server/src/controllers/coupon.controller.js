import CouponService from "../services/coupon.service.js";

export default class CouponController {
  static async getAllCoupons(req, res) {
    try {
      const coupons = await CouponService.getAllCoupons();
      res.json(coupons);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getCouponById(req, res) {
    try {
      const coupon = await CouponService.getCouponById(req.params.id);
      if (!coupon) return res.status(404).json({ message: "Coupon not found" });
      res.json(coupon);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getCouponByCode(req, res) {
    try {
      const code = req.params.code;
      const coupon = await CouponService.getCouponByCode(code);

      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }

      res.json(coupon);
    } catch (err) {
      console.error("Error fetching coupon by code:", err);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async addCoupon(req, res) {
    try {
      const coupon = await CouponService.addCoupon(req.body);
      res.status(201).json(coupon);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateCoupon(req, res) {
    try {
      const coupon = await CouponService.updateCoupon(req.params.id, req.body);
      if (!coupon) return res.status(404).json({ message: "Coupon not found" });
      res.json(coupon);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async deleteCoupon(req, res) {
    try {
      const coupon = await CouponService.deleteCoupon(req.params.id);
      if (!coupon) return res.status(404).json({ message: "Coupon not found" });
      res.json({ message: "Coupon deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async toggleStatus(req, res) {
    try {
      const coupon = await CouponService.toggleStatus(req.params.id);
      if (!coupon) return res.status(404).json({ message: "Coupon not found" });
      res.json(coupon);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
