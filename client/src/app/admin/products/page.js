"use client";

import { motion } from "framer-motion";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import fallback from "@/assets/fallback.png";
import { useState } from "react";
import Pagination from "@/components/productpage/Pagination";
import { useRouter } from "next/navigation";
import ProductFilter from "@/components/admin-routes/ProductFilter";
import Swal from "sweetalert2";
import Link from "next/link";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AdminProducts = () => {
  const { products, productIsLoading, productError, productRefetch } =
    useProducts();

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const axiosSecure = useAxiosSecure();

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? p.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const start = (page - 1) * itemsPerPage;
  const paginated = filteredProducts.slice(start, start + itemsPerPage);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/product/${id}`);
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        productRefetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  if (productIsLoading) return <p>Loading...</p>;
  if (productError) return <p>Error loading users</p>;

  return (
    <main className="w-11/12 mx-auto min-h-screen pb-8">
      <h1 className="text-center text-lg sm:text-xl md:text-3xl lg:text-5xl 2xl:text-7xl font-bold my-10">
        Product List
      </h1>

      <div className="overflow-hidden w-full">
        <ProductFilter
          categories={categories}
          onSearch={(q) => setSearchQuery(q)}
          onCategoryChange={(c) => setSelectedCategory(c)}
          onAddNew={() => router.push("/admin/add-product")}
        />
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-[#008080]">
            <tr className="text-white text-sm md:text-base lg:text-lg">
              <th className="px-2 py-3 md:px-4 md:py-4 text-left">Image</th>
              <th className="px-2 py-3 md:px-4 md:py-4 text-left">Name</th>
              <th className="px-2 py-3 md:px-4 md:py-4 text-left">Category</th>
              <th className="px-2 py-3 md:px-4 md:py-4 text-left">Stock</th>
              <th className="px-2 py-3 md:px-4 md:py-4 text-center">Update</th>
              <th className="px-2 py-3 md:px-4 md:py-4 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product, idx) => (
              <motion.tr
                key={product._id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`text-gray-700 text-sm md:text-base py-8 xl:text-lg ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="relative h-5 w-5 sm:h-8 sm:w-8 md:h-12 md:w-12 xl:h-16 xl:w-16 px-2 py-1 md:px-2 md:py-3">
                  <Image
                    src={
                      product.images &&
                      Array.isArray(product.images) &&
                      typeof product.images[0] === "string" &&
                      product.images[0].trim() !== ""
                        ? product.images[0]
                        : fallback
                    }
                    alt={product.name}
                    fill
                    priority
                    className="rounded-xl object-cover"
                  />
                </td>
                <td className="px-2 py-1 md:px-2 md:py-3">{product.name}</td>
                <td className="px-2 py-1 md:px-2 md:py-3">
                  {product.category}
                </td>
                <td className="px-2 py-1 md:px-2 md:py-3">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-semibold">
                      {product.stock}
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Out of stock
                    </span>
                  )}
                </td>
                <td className="px-2 py-1 md:px-2 md:py-3 text-center">
                  <Link href={`/admin/updateProduct/${product._id}`}>
                    <button className="text-[#008080] hover:text-[#016b6b] cursor-pointer transition-colors">
                      <FiEdit2 size={20} />
                    </button>
                  </Link>
                </td>
                <td className="px-2 py-1 md:px-2 md:py-3 text-center">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 cursor-pointer hover:text-red-800 transition-colors"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div>
          {products.length > itemsPerPage && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(products.length / itemsPerPage)}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminProducts;
