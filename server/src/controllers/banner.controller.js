import bannerService from "../services/banner.service.js";


export const addBanner = async (req, res) => {
  try {
    const banner = await bannerService.addBanner(req.body);
    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBanners = async (req, res) => {
  try {
    const banners = await bannerService.getAllBanners();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await bannerService.updateBanner(req.params.id, req.body);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await bannerService.deleteBanner(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
