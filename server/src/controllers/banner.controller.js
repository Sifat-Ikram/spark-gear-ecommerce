import bannerService from "../services/banner.service.js";

class BannerController {
  async addBanner(req, res) {
    try {
      const banner = await bannerService.addBanner(req.body);
      res.status(201).json({ banner });
    } catch (err) {
      console.error("Add banner error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getAllBanners(req, res) {
    try {
      const banners = await bannerService.getAllBanners();
      res.json({ banners });
    } catch (err) {
      console.error("Get banners error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateBanner(req, res) {
    try {
      const updatedBanner = await bannerService.updateBanner(
        req.params.id,
        req.body
      );
      res.json({ updatedBanner });
    } catch (err) {
      console.error("Update banner error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteBanner(req, res) {
    try {
      await bannerService.deleteBanner(req.params.id);
      res.json({ message: "Banner deleted" });
    } catch (err) {
      console.error("Delete banner error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async setActiveBanner(req, res) {
    try {
      const activeBanner = await bannerService.setActiveBanner(req.params.id);
      res.json({ activeBanner });
    } catch (err) {
      console.error("Set active banner error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getActiveBanner(req, res) {
    try {
      const activeBanner = await bannerService.getActiveBanner();
      res.json({ activeBanner });
    } catch (err) {
      console.error("Get active banner error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

export default new BannerController();
