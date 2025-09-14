"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { motion } from "framer-motion";
import { useBanners } from "@/hooks/useBanners";
import fallback from "@/assets/fallback.png";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AddBanners = () => {
  const axiosSecure = useAxiosSecure();
  const [newImage, setNewImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { banners, bannerIsLoading, bannerError, bannerRefetch } = useBanners();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "" },
  });

  // Image upload handler
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Image too large!",
        text: "Max 5MB.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        formData,
        { timeout: 15000 }
      );
      const url = res?.data?.data?.url;
      if (!url) throw new Error("Upload failed");
      setNewImage(url);
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Upload failed", text: err.message });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Add new banner
  const handleAddBanner = async (data) => {
    if (!newImage) {
      Swal.fire({
        icon: "warning",
        title: "Image missing!",
        text: "Please upload an image first.",
      });
      return;
    }
    const bannerData = { ...data, image: newImage };

    try {
      await axiosSecure.post("/api/banner", bannerData);
      Swal.fire({
        icon: "success",
        title: "Banner added!",
        timer: 1500,
        showConfirmButton: false,
      });
      reset({ name: "" });
      setNewImage("");
      bannerRefetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to add banner",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  // Remove banner
  const handleRemoveBanner = async (id) => {
    try {
      await axiosSecure.delete(`/api/banner/${id}`);
      Swal.fire({
        icon: "success",
        title: "Banner removed!",
        timer: 1500,
        showConfirmButton: false,
      });
      bannerRefetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to remove banner",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  if (bannerIsLoading)
    return (
      <p className="text-center py-10 text-gray-500">Loading banners...</p>
    );
  if (bannerError)
    return (
      <p className="text-center py-10 text-red-500">Error loading banners.</p>
    );

  return (
    <main className="w-11/12 max-w-6xl mx-auto py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-[#008080]">
        Manage Banners
      </h1>

      {/* Add Banner Form */}
      <form
        onSubmit={handleSubmit(handleAddBanner)}
        className="flex flex-col gap-6 mb-12 bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          <div className="flex-1 flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Banner Name
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="Enter banner name"
              className="border rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Image</label>
            <div className="flex items-center gap-4">
              {newImage ? (
                <Image
                  src={newImage}
                  alt="Preview"
                  width={300}
                  height={150}
                  className="w-full h-40 md:h-48 object-cover rounded-lg border"
                />
              ) : (
                <label className="relative flex-1 cursor-pointer bg-gray-100 rounded-lg border-dashed border-2 border-gray-300 hover:border-[#008080] hover:bg-gray-50 flex items-center justify-center h-40 md:h-48 text-gray-500 font-medium">
                  {isUploading ? "Uploading..." : "Upload Image"}
                  <input
                    type="file"
                    onChange={handleUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="w-full buttons">
          {isUploading ? "Uploading..." : "Add Banner"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {banners.map((banner) => (
          <motion.div
            key={banner._id}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden group border border-gray-200"
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={banner?.image ? banner.image : fallback}
              alt={banner.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 flex justify-between items-center">
              <p className="font-medium text-gray-700 truncate">
                {banner.name}
              </p>
              <button
                type="button"
                onClick={() => handleRemoveBanner(banner._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FiX size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default AddBanners;
