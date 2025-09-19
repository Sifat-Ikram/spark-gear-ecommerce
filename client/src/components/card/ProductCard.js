"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import fallback from "@/assets/fallback.png";

export default function ProductCard({ product }) {
  const imageUrl = product?.images?.[0]?.url || fallback;

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden flex flex-col">
      <motion.div
        className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={imageUrl}
          alt={product.images[0].alt || "Product image"}
          fill
          className="object-cover object-center h-full w-full"
        />
      </motion.div>

      {/* Product Info */}
      <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Category: {product.category}
          </p>
        </div>

        <div className="mt-3 flex flex-row items-center justify-between">
          <p className="text-sm md:text-base lg:text-lg font-bold text-gray-900">
            {product.price.toFixed(2)} BDT
          </p>
          <Link href={`/main-layout/productDetails/${product?.slug}`}>
            <button className="bg-[#008080] hover:bg-[#016b6b] text-white font-semibold px-4 sm:px-5 py-2 rounded-lg transition text-sm sm:text-base">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
