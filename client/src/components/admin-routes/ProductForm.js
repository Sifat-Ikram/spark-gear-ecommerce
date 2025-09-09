"use client";

import { motion } from "framer-motion";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";

export default function ProductForm({ defaultValues, onSubmit, type }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      sku: "",
      brand: "",
      category: "",
      price: "",
      currency: "USD",
      shortDescription: "",
      description: "",
      images: [{ url: "", alt: "" }],
      stock: "",
      available: true,
      ratings: { average: "", reviewsCount: "" },
      releaseDate: "",
      specs: [{ name: "", value: "" }],
      warranty: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        releaseDate: defaultValues.releaseDate
          ? new Date(defaultValues.releaseDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [defaultValues, reset]);

  const {
    fields: specFields,
    append: addSpec,
    remove: removeSpec,
  } = useFieldArray({ control, name: "specs" });

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-white p-8 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Basic Info */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
          Basic Info
        </h2>

        <div className="flex flex-col sm:flex-row sm:justify-between max-sm:gap-2">
          <div className="w-full sm:w-[45%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full sm:w-[45%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              {...register("brand")}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between max-sm:gap-2">
          <div className="w-full sm:w-[45%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              {...register("slug", { required: "Slug is required" })}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <div className="w-full sm:w-[45%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SKU
            </label>
            <input
              {...register("sku")}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between max-sm:gap-2">
          <div className="w-full sm:w-[45%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              {...register("category")}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
          </div>
          <div className="w-full sm:w-[45%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              {...register("stock")}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between max-sm:gap-2">
          <div className="w-full sm:w-[45%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="w-full sm:w-[45%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <input
              {...register("currency")}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
          Descriptions
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description
          </label>
          <textarea
            {...register("shortDescription")}
            className="w-full border p-2 rounded-lg border-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Description
          </label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded-lg border-gray-400"
            rows={4}
          />
        </div>
      </div>

      {/* Specs */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
          Specifications
        </h2>
        {specFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              placeholder="Spec Name"
              {...register(`specs.${index}.name`)}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
            <input
              placeholder="Spec Value"
              {...register(`specs.${index}.value`)}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
            <button
              type="button"
              onClick={() => removeSpec(index)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addSpec({ name: "", value: "" })}
          className="px-4 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#016b6b]"
        >
          + Add Spec
        </button>
      </div>

      {/* Ratings */}
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
        Ratings
      </h2>
      <div className="flex flex-col sm:flex-row sm:justify-between max-sm:gap-2">
        <div className="w-full sm:w-[45%]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Average Rating
          </label>
          <input
            type="number"
            step="0.1"
            {...register("ratings.average")}
            className="w-full border p-2 rounded-lg border-gray-400"
          />
        </div>

        <div className="w-full sm:w-[45%]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reviews Count
          </label>
          <input
            type="number"
            {...register("ratings.reviewsCount")}
            className="w-full border p-2 rounded-lg border-gray-400"
          />
        </div>
      </div>

      {/* Availability & Warranty */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
          Other
        </h2>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("available")} />
          <label className="text-sm font-medium text-gray-700">Available</label>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between max-sm:gap-2">
          <div className="w-full sm:w-[45%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Warranty
            </label>
            <input
              {...register("warranty")}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
          </div>
          <div className="w-full sm:w-[45%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Release Date
            </label>
            <input
              type="date"
              {...register("releaseDate")}
              className="w-full border p-2 rounded-lg border-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full buttons mt-14"
      >
        {type === "update" ? "Update Product" : "Add Product"}
      </motion.button>
    </motion.form>
  );
}
