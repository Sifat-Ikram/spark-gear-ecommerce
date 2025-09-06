"use client";

import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiPlus, FiX } from "react-icons/fi";
import { useAuth } from "@/provider/AuthContext";

const ProductImages = ({ productId, type, images = [] }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const { axiosInstance } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [linkInputs, setLinkInputs] = useState([""]);
  const [localImages, setLocalImages] = useState(
    images?.length ? images.map((img) => img.url) : []
  );

  const handleUpload = async (e) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Image not uploaded!",
        text: "File is too large! Please upload an image under 5MB",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setIsLoading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        formData,
        { timeout: 15000 }
      );
      const url = res?.data?.data.url;

      if (!url) {
        console.error("Upload failed: no URL returned", res.data);
        return;
      }

      const updated = [...localImages, url].filter(Boolean);
      setLocalImages(updated);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddLinkInput = () => {
    setLinkInputs([...linkInputs, ""]);
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...linkInputs];
    newLinks[index] = value;
    setLinkInputs(newLinks);

    if (value.startsWith("https://") && value.length > 10) {
      const updated = [...localImages];
      if (!updated.includes(value)) {
        updated.push(value);
        setLocalImages(updated);
      }
    }
  };

  const handleRemoveImage = async (indexToRemove) => {
    // Remove locally first
    const updated = localImages.filter((_, i) => i !== indexToRemove);
    setLocalImages(updated);

    // Only update backend if this is an update flow
    if (type === "update" && productId) {
      try {
        const imagesPayload = updated.map((url) => ({
          url,
          alt: "Product image",
        }));

        const res = await axiosInstance.patch(
          `/api/images/products/${productId}/images`,
          { images: imagesPayload },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (err) {
        console.error("Failed to remove image:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to remove image",
          text: err.response?.data?.message || err.message,
        });
        // Revert local state if backend fails
        setLocalImages(localImages);
      }
    }
  };

  const addImages = async () => {
    if (!productId) {
      Swal.fire({
        icon: "error",
        title: "Product ID missing!",
        text: "Please save the product first before adding images.",
      });
      return;
    }

    if (localImages.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No images to add",
        text: "Please upload or paste at least one image link.",
      });
      return;
    }

    try {
      const imagesPayload = localImages.map((url) => ({
        url,
        alt: "Product image",
      }));

      const res = await axiosInstance.patch(
        `/api/images/products/${productId}/images`,
        { images: imagesPayload },
        { headers: { "Content-Type": "application/json" } }
      );

      Swal.fire({
        icon: "success",
        title: "Images added!",
        text: "Images were added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setLocalImages(res.data.images.map((img) => img.url));
      router.push("/admin/products");
    } catch (err) {
      console.error("Failed to add images:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to add images",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between max-sm:space-x-2">
        <div className="space-y-2 w-[45%]">
          {linkInputs.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                placeholder="Paste image link"
                className="w-full px-3 py-2 border rounded-lg"
              />
              {index === linkInputs.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddLinkInput}
                  className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  <FiPlus />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex-1 flex justify-center items-center">
          <label className="buttons relative">
            {isLoading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              onChange={handleUpload}
              ref={fileInputRef}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Image grid */}
      {localImages?.length ? (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {localImages?.map((url, index) => (
            <motion.div
              key={index}
              className="relative group rounded-lg overflow-hidden shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              {url && (
                <Image
                  src={url}
                  alt="Product"
                  width={200}
                  height={200}
                  className="object-cover w-full h-32"
                />
              )}
              <button
                type="button"
                onClick={() => handleRemoveImage(url, index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FiX size={16} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <h1 className="text-center text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl">
          There is no images yet!!!
        </h1>
      )}

      <div className="flex justify-center items-center">
        <button onClick={addImages} className="buttons w-2/5 mx-auto">
          Add Images
        </button>
      </div>
    </div>
  );
};

export default ProductImages;
