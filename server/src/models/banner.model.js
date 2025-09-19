import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    paragraph: { type: String, required: true, trim: true },
    video: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;
