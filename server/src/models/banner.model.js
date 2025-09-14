import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;
