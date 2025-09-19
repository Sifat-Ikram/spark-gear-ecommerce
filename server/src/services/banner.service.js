import Banner from "../models/banner.model.js";

class BannerService {
  async addBanner(data) {
    const banner = new Banner(data);
    return await banner.save();
  }

  async getAllBanners() {
    return await Banner.find().sort({ createdAt: -1 });
  }

  async updateBanner(id, data) {
    return await Banner.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBanner(id) {
    return await Banner.findByIdAndDelete(id);
  }

  async setActiveBanner(id) {
    await Banner.updateMany({}, { isActive: false });
    return await Banner.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );
  }

  async getActiveBanner() {
    return await Banner.findOne({ isActive: true });
  }
}

export default new BannerService();
