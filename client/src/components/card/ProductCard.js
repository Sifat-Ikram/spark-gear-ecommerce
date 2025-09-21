"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import fallback from "@/assets/fallback.png";

export default function ProductCard({ product }) {
  const imageUrl = product?.images?.[0]?.url || fallback;

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px] xl:max-w-[360px] 2xl:max-w-[380px] 3xl:max-w-[400px]">
      {/* Image Section */}
      <motion.div
        className="relative w-full h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px] 2xl:h-[340px] 3xl:h-[360px] overflow-hidden rounded-t-3xl"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={imageUrl}
          alt={product.images[0]?.alt || "Product image"}
          fill
          className="object-cover object-center w-full h-full"
        />
      </motion.div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col p-3 sm:p-4 md:p-5 lg:p-6 xl:p-6 2xl:p-7 3xl:p-8">
        <h3 className="roboto text-gray-800 text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl font-semibold truncate mb-1">
          {product.name}
        </h3>
        <p className="roboto text-gray-700 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg 3xl:text-lg mb-1 truncate">
          Category: {product.category}
        </p>
        <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-xl font-semibold text-gray-900 whitespace-nowrap">
          {product.price.toFixed(2)} BDT
        </p>
        <Link
          href={`/main-layout/productDetails/${product?.slug}`}
          className="w-full mt-5"
        >
          <button className="cursor-pointer rounded-md text-xs sm:text-sm lg:text-base xl:text-xl 2xl:text-2xl 3xl:text-3xl font-semibold py-2 sm:py-2.5 w-full bg-[#008080] text-white hover:bg-[#016b6b] roboto whitespace-nowrap">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
