"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { FiX, FiPlus } from "react-icons/fi";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/provider/AuthContext";

const AddCategories = () => {
  const { categories, categoryIsLoading, categoryError, categoryRefetch } =
    useCategories();

  const { axiosInstance } = useAuth();
  const [localCategories, setLocalCategories] = useState();
  const [newImage, setNewImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "" },
  });

  // handle image upload to imgbb
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Image too large!",
        text: "Please upload an image under 5MB.",
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
      Swal.fire({
        icon: "success",
        title: "Image uploaded!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: err.message,
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddCategory = async (data) => {
    if (!newImage) {
      Swal.fire({
        icon: "warning",
        title: "Image missing!",
        text: "Please upload an image first.",
      });
      return;
    }

    const categoryData = { ...data, image: newImage };

    try {
      const res = await axiosInstance.post("/api/category", categoryData);

      Swal.fire({
        icon: "success",
        title: "Category added!",
        timer: 1500,
        showConfirmButton: false,
      });

      reset({ name: "" });
      setNewImage("");
      categoryRefetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to add category",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const handleRemoveCategory = async (id) => {
    try {
      await axiosInstance.delete(`/api/category/${id}`);

      Swal.fire({
        icon: "success",
        title: "Category removed!",
        timer: 1500,
        showConfirmButton: false,
      });
      categoryRefetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to remove category",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  if (categoryIsLoading) return <p>Loading categories...</p>;
  if (categoryError) return <p>Error loading categories.</p>;

  return (
    <main className="w-11/12 max-w-5xl mx-auto py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
        Add Categories
      </h1>

      {/* Add New Category Form */}
      <form
        onSubmit={handleSubmit(handleAddCategory)}
        className="flex flex-col md:flex-row md:items-end gap-4 mb-10 bg-white p-6 rounded-xl shadow-md"
      >
        <div className="flex-1 flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            Category Name
          </label>
          <input
            {...register("name", { required: true })}
            className="border rounded-lg p-2 w-full"
            placeholder="Enter category name"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Image</label>
          <div className="flex items-center gap-2">
            {newImage ? (
              <Image
                src={newImage}
                alt="Preview"
                width={200}
                height={200}
                className="w-full h-40 object-cover"
              />
            ) : (
              <label className="buttons relative flex-1">
                {isUploading
                  ? "Uploading..."
                  : newImage
                  ? "Image Uploaded"
                  : "Upload Image"}
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

        <button
          type="submit"
          className="buttons w-full md:w-auto mt-4 md:mt-0 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Add Category
        </button>
      </form>

      {/* Existing Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <motion.div
            key={cat._id}
            className="relative bg-white rounded-xl shadow-md overflow-hidden group"
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={cat.image}
              alt={cat.name}
              width={300}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-2 flex justify-between items-center">
              <p className="font-medium text-gray-700">{cat.name}</p>
              <button
                type="button"
                onClick={() => handleRemoveCategory(cat._id)}
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

export default AddCategories;
