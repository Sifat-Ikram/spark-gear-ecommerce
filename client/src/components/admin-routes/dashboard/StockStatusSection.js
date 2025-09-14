"use client";

import { motion } from "framer-motion";
import { FaBoxOpen, FaExclamationTriangle } from "react-icons/fa";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";

export default function StockStatusSection() {
  const { products, productIsLoading } = useProducts();

  if (productIsLoading) return <p className="text-center py-10">Loading...</p>;

  // Filter products
  const lowStock = products?.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStock = products?.filter((p) => p.stock === 0);

  return (
    <div className="px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Inventory Alerts
      </h2>

      {/* Low Stock */}
      {lowStock?.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-yellow-600 mb-4 flex items-center gap-2">
            <FaExclamationTriangle /> Low Stock Products
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
            {lowStock.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  height={100}
                  width={100}
                  className="w-24 h-24 object-contain mb-3"
                />
                <h4 className="font-medium text-gray-700 line-clamp-2">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                <span className="mt-2 inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                  Low Stock
                </span>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Out of Stock */}
      {outOfStock?.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
            <FaBoxOpen /> Out of Stock Products
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {outOfStock.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  height={100}
                  width={100}
                  className="w-24 h-24 object-contain mb-3 grayscale"
                />
                <h4 className="font-medium text-gray-700 line-clamp-2">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                <span className="mt-2 inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                  Out of Stock
                </span>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {!lowStock?.length && !outOfStock?.length && (
        <p className="text-gray-500 text-center py-10">
          🎉 All products are well-stocked!
        </p>
      )}
    </div>
  );
}
