"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { FiX, FiCheck } from "react-icons/fi";
import Image from "next/image";
import { motion } from "framer-motion";
import { useBanners } from "@/hooks/useBanners";
import fallback from "@/assets/fallback.png";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AddBanners = () => {
  const axiosSecure = useAxiosSecure();
  const { banners, bannerIsLoading, bannerError, bannerRefetch } = useBanners();
  const [newVideo, setNewVideo] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: "", paragraph: "" },
  });

  // Upload handler (Cloudinary unsigned video upload)
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid file",
        text: "Please select a video file (mp4, webm, mov...).",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const MAX = 100 * 1024 * 1024;
    if (file.size > MAX) {
      Swal.fire({
        icon: "error",
        title: "Video too large!",
        text: "Max 100MB allowed.",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("folder", "banners");

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`;

      const res = await axios.post(url, formData, {
        timeout: 120000,
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      const secureUrl = res?.data?.secure_url;
      if (!secureUrl) throw new Error("Upload failed (no URL returned)");

      setNewVideo(secureUrl);
      Swal.fire({
        icon: "success",
        title: "Uploaded",
        timer: 1100,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: err?.message || "Something went wrong during upload",
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 600);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Add new banner
  const handleAddBanner = async (data) => {
    if (!newVideo) {
      Swal.fire({
        icon: "warning",
        title: "Video missing!",
        text: "Please upload a video first.",
      });
      return;
    }

    const bannerData = { ...data, video: newVideo };

    try {
      const res = await axiosSecure.post("/api/banner", bannerData);
      console.log(res.data);

      Swal.fire({
        icon: "success",
        title: "Banner added!",
        timer: 1500,
        showConfirmButton: false,
      });
      reset({ title: "", paragraph: "" });
      setNewVideo("");
      bannerRefetch();
    } catch (err) {
      console.error("Add banner error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to add banner",
        text: err?.response?.data?.message || err?.message || "Server error",
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
        timer: 1200,
        showConfirmButton: false,
      });
      bannerRefetch();
    } catch (err) {
      console.error("Remove banner error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to remove banner",
        text: err?.response?.data?.message || err?.message || "Server error",
      });
    }
  };

  // Set active banner
  const handleSetActive = async (id) => {
    try {
      await axiosSecure.patch(`/api/banner/active/${id}`);
      Swal.fire({
        icon: "success",
        title: "Banner is now active!",
        timer: 1200,
        showConfirmButton: false,
      });
      bannerRefetch();
    } catch (err) {
      console.error("Set active banner error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to activate banner",
        text: err?.response?.data?.message || err?.message || "Server error",
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
          {/* Title & Paragraph */}
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <label className="mb-5 font-medium text-gray-700">Title</label>
              <input
                {...register("title", { required: true })}
                placeholder="Enter banner title"
                className="border rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
            </div>
            <div>
              <label className="mb-5 font-medium text-gray-700">
                Paragraph
              </label>
              <textarea
                {...register("paragraph", { required: true })}
                placeholder="Enter banner paragraph"
                rows={3}
                className="border rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
              />
            </div>
          </div>

          {/* Video Upload */}
          <div className="flex-1 flex flex-col">
            <label className="mb-5 font-medium text-gray-700">Video</label>
            <div className="flex items-center gap-4">
              {newVideo ? (
                <video
                  src={newVideo}
                  controls
                  className="w-full h-40 md:h-48 object-cover rounded-lg border"
                />
              ) : (
                <label className="relative flex-1 cursor-pointer bg-gray-100 rounded-lg border-dashed border-2 border-gray-300 hover:border-[#008080] hover:bg-gray-50 flex items-center justify-center h-40 md:h-48 text-gray-500 font-medium">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <span>Uploading... {uploadProgress}%</span>
                      <div className="w-40 bg-gray-200 h-2 rounded overflow-hidden mt-2">
                        <div
                          style={{ width: `${uploadProgress}%` }}
                          className="h-full bg-[#008080]"
                        />
                      </div>
                    </div>
                  ) : (
                    "Upload Video"
                  )}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#008080] text-white font-semibold rounded-lg hover:bg-[#006666] transition"
        >
          {isUploading ? "Uploading..." : "Add Banner"}
        </button>
      </form>

      {banners.length === 0 ? (
        <h1 className="text-lg sm:text-xl xl:text-3xl 2xl:text-4xl font-semibold text-center">
          There is no banners yet!!!
        </h1>
      ) : (
        <div className="flex flex-col w-full gap-6">
          {banners.map((b) => (
            <motion.div
              key={b._id}
              className="relative bg-white rounded-2xl shadow-md overflow-hidden group flex flex-col sm:flex-row gap-5 lg:gap-8 xl:gap-10"
              whileHover={{ scale: 1.03 }}
            >
              <div className="h-full w-full sm:w-1/2 xl:w-2/4">
                {b?.video ? (
                  <video
                    src={b.video}
                    controls
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full">
                    <Image
                      src={fallback}
                      alt={b.title || "fallback"}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="sm:flex-1 p-3 flex flex-col gap-2">
                <p className="font-bold text-gray-700 truncate">{b.title}</p>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {b.paragraph}
                </p>

                <div className="flex max-sm:justify-between sm:gap-5 items-center mt-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveBanner(b._id)}
                    className="bg-red-600 hover:bg-red-800 text-white rounded-lg px-2 lg:px-4 xl:px-6 py-1 xl:py-2 font-medium flex items-center gap-1"
                  >
                    <FiX size={18} /> Remove
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetActive(b._id)}
                    className={`rounded-lg px-2 lg:px-4 xl:px-6 py-1 xl:py-2 font-medium flex items-center gap-1 ${
                      b.isActive
                        ? "bg-[#008080] text-white"
                        : "bg-gray-200 text-[#008080] hover:bg-gray-300"
                    }`}
                  >
                    <FiCheck size={16} />{" "}
                    {b.isActive ? "Active" : "Make Active"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AddBanners;
