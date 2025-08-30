"use client";

import Link from "next/link";
import slugify from "slugify";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedCard({ product }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 inline-block"
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
          className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 inline-block"
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
      href={`/productDetails/${slugify(product?.name, { lower: true })}`}
      className="bg-gray-50 group border-[1px] border-[#00a88f] rounded-2xl shadow-lg overflow-hidden flex flex-col"
    >
      <motion.div className="relative w-full h-48 overflow-hidden transform transition-transform duration-500 ease-in-out group-hover:scale-110">
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          loading="lazy"
          className="object-contain h-full w-full"
        />
      </motion.div>

      {/* Product Info */}
      <div className="flex-1 p-2 sm:p-3 md:p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
            {product.name}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
            Brand: {product.brand}
          </p>

          <div className="mt-1 flex items-center">
            {renderStars(product.ratings.average)}
            <span className="ml-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              ({product.ratings.reviewsCount})
            </span>
          </div>
        </div>

        <p className="mt-3 text-sm md:text-base lg:text-lg font-bold text-[#00a88f]">
          {product.price.toFixed(2)} BDT
        </p>
      </div>
    </Link>
  );
}
