"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import fallback from "@/assets/fallback.png";

export default function FeaturedCard({ product }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 inline-block text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.783.57-1.838-.196-1.538-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.068 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
        </svg>
      );
    }

    if (halfStar) {
      stars.push(
        <svg
          key="half"
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 inline-block text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-3.09 1.636 0.59-3.437L4 10.545l3.455-.503L10 7l1.545 2.042L15 10.545l-3.5 2.654.59 3.437L10 15z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <Link
      href={`/main-layout/productDetails/${product?.slug}`}
      className="bg-gray-50 group rounded-2xl shadow overflow-hidden flex flex-col"
    >
      <motion.div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-64 xl:h-72 2xl:h-80 3xl:h-96 overflow-hidden">
        {/* First image (default) */}
        <Image
          src={product?.images?.[0]?.url || fallback}
          alt={product?.images?.[0]?.alt || "Product image"}
          fill
          loading="lazy"
          className="object-cover object-center h-full w-full transition-opacity duration-500 group-hover:opacity-0"
        />
        <Image
          src={product?.images?.[1]?.url || fallback}
          alt={product?.images?.[1]?.alt || "Product image"}
          fill
          loading="lazy"
          className="object-cover object-center h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </motion.div>

      <div className="flex-1 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-8 3xl:p-10 flex flex-col justify-between 2xl:space-y-5">
        <h3 className="subtitle-text roboto truncate 2xl:text-2xl 3xl:text-3xl">
          {product.name}
        </h3>

        <p className="max-2xl:mt-1 text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl 3xl:text-2xl roboto text-gray-600">
          Brand: {product.brand}
        </p>

        <div className="max-2xl:mt-1 flex items-center">
          {renderStars(product.ratings.average)}
          <span className="ml-2 text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl roboto text-gray-600">
            ({product.ratings.reviewsCount})
          </span>
        </div>
        <p className="max-2xl:mt-5 2xl:mt-6 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl font-bold roboto text-[#008080]">
          {product.price.toFixed(2)} BDT
        </p>
      </div>
    </Link>
  );
}
