"use client";

import { useState } from "react";
import ProductForm from "@/components/admin-routes/ProductForm";
import ProductImages from "@/components/admin-routes/ProductImages";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState(null);

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      slug: data.slug,
      sku: data.sku,
      price: Number(data.price),
      brand: data.brand || "",
      category: data.category || "",
      currency: data.currency || "USD",
      shortDescription: data.shortDescription || "",
      description: data.description || "",
      stock: Number(data.stock) || 0,
      available: !!data.available,
      ratings: {
        average: Number(data.ratings?.average || 0),
        reviewsCount: Number(data.ratings?.reviewsCount || 0),
      },
      specs: data.specs || [],
      warranty: data.warranty || "",
      releaseDate: data.releaseDate || null,
    };

    try {
      const res = await axiosSecure.post("/api/product", payload);
      setProductData(res.data);
      setProductId(res.data._id);

      Swal.fire({
        icon: "success",
        title: "Product Created!",
        text: `Product "${res.data.name}" has been added successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Failed to create product:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to create product",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <main className="w-11/12 mx-auto min-h-screen pb-8">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl 2xl:text-7xl font-semibold my-10">
        {productData ? "Add Images" : "Add Product"}
      </h1>
      <div className="py-10">
        {!productData ? (
          <ProductForm type={"add"} onSubmit={onSubmit} />
        ) : (
          <ProductImages type={"add"} productId={productId} />
        )}
      </div>
    </main>
  );
};

export default AddProduct;
