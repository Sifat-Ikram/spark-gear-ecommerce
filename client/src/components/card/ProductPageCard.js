"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import fallback from "@/assets/fallback.png";

export default function ProductPageCard({ product }) {
  const imageUrl = product?.images?.[0]?.url || fallback;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-50 rounded-xl shadow flex flex-col"
    >
      <Link
        href={`/main-layout/productDetails/${product?.slug}`}
        className="flex flex-col h-full group"
      >
        <motion.div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-64 xl:h-72 2xl:h-80 3xl:h-96 overflow-hidden">
          {/* First image (default) */}
          <Image
            src={product?.images?.[0]?.url || fallback}
            alt={product?.images?.[0]?.alt || "Product image"}
            fill
            loading="lazy"
            className="object-cover object-center rounded-t-xl h-full w-full transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src={product?.images?.[1]?.url || fallback}
            alt={product?.images?.[1]?.alt || "Product image"}
            fill
            loading="lazy"
            className="object-cover object-center rounded-t-xl h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </motion.div>

        <div className="flex-1 p-2 sm:p-3 md:p-4 lg:p-3 2xl:p-6 3xl:p-8 flex flex-col justify-between space-y-4 sm:space-y-2 xl:space-y-3 2xl:space-y-5">
          <div>
            <h3 className="text-sm sm:text-base xl:text-lg 2xl:text-xl exo">
              {product?.name}
            </h3>
            <p className="text-sm 2xl:text-base roboto text-gray-500 line-clamp-3">
              {product?.shortDescription}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#008080] font-bold">
              {product?.price} BDT
            </span>
            <span className="text-sm text-yellow-600">
              ⭐ {product?.ratings?.average}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
