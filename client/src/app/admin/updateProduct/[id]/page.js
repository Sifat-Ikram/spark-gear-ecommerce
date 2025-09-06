"use client";

import ProductForm from "@/components/admin-routes/ProductForm";
import ProductImages from "@/components/admin-routes/ProductImages";
import { useProductById } from "@/hooks/useProductById";
import { useAuth } from "@/provider/AuthContext";
import { use, useState } from "react";
import Swal from "sweetalert2";

const UpdateProduct = ({ params }) => {
  const { id } = use(params);
  const { axiosInstance } = useAuth();
  const [productData, setProductData] = useState(null);
  const [productId, setProductId] = useState(null);

  const { product, productIsLoading, productError, productRefetch } =
    useProductById(id);

  if (productIsLoading) return <p>Loading...</p>;
  if (productError) return <p>Error loading product</p>;

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.put(`/api/product/${id}`, data);
      setProductData(res.data);
      setProductId(res.data._id);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Product Updated!",
          text: "The product has been successfully updated.",
          timer: 2000,
          showConfirmButton: false,
        });
        productRefetch();
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.res?.data?.message ||
          "Something went wrong while updating the product.",
      });
    }
  };

  return (
    <main className="w-11/12 mx-auto min-h-screen pb-8">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl 2xl:text-7xl font-semibold my-10">
        {!productData ? "Update Product" : "Update Images"}
      </h1>
      <div>
        {!productData ? (
          <ProductForm
            defaultValues={product}
            type={"update"}
            onSubmit={onSubmit}
          />
        ) : (
          <ProductImages type="update" productId={productId} images={product?.images || []} />
        )}
      </div>
    </main>
  );
};

export default UpdateProduct;
