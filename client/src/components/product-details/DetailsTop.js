"use client";

import Link from "next/link";
import { FaChevronRight, FaStar } from "react-icons/fa";
import ImageSection from "./ImageSection";
import { motion } from "framer-motion";

const DetailsTop = ({ product }) => {
  return (
    <section className="pt-5 pb-10 px-4 sm:px-6 lg:px-16">
      {/* Breadcrumb */}
      <nav
        className="flex flex-wrap items-center space-x-2 text-gray-600 text-xs sm:text-sm mb-6"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-primary font-medium">
          Home
        </Link>
        <FaChevronRight className="w-3 h-3" />
        <Link href="/allProduct" className="hover:text-primary font-medium">
          Products
        </Link>
        <FaChevronRight className="w-3 h-3" />
        <span className="text-gray-900 font-semibold truncate sm:truncate-none max-w-[150px] sm:max-w-full">
          {product.name}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row lg:space-x-14 gap-10 items-start lg:items-stretch">
        <motion.div
          className="lg:w-1/2 w-full flex-shrink-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ImageSection images={product?.images} />
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="lg:w-1/2 w-full flex flex-col justify-between h-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex-1 flex flex-col justify-between space-y-5 h-full">
            {/* Product Name */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words leading-snug sm:leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Warranty */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={`h-4 w-4 ${
                        idx < Math.round(product.ratings.average)
                          ? "fill-yellow-500"
                          : "fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.ratings.average} / 5 ({product.ratings.reviewsCount}{" "}
                  reviews)
                </span>
              </div>
              <span className="text-sm text-gray-700">
                {product.warranty} warranty available
              </span>
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-gray-600 text-left w-4/5">
              {product?.shortDescription}
            </p>

            {/* Product Details */}
            <div className="flex flex-col space-y-2 text-gray-800 text-sm sm:text-base">
              <span>
                <strong>Brand:</strong> {product?.brand}
              </span>
              <span
                className={`${
                  product.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock} items in stock
              </span>
              <span className="text-lg font-semibold">
                {product?.price} BDT
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <button className="w-full buttons mt-auto">Add to Cart</button>
        </motion.div>
      </div>
    </section>
  );
};

export default DetailsTop;
