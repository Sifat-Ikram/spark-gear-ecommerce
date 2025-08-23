"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

const FeaturedProducts = () => {
  const { products, productIsLoading, productError } = useProducts();

  if (productIsLoading)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 py-8 sm:py-12">
        Loading featured products...
      </p>
    );

  if (productError)
    return (
      <p className="text-center text-red-500 dark:text-red-300 py-8 sm:py-12">
        Failed to load products
      </p>
    );

  if (!products || products.length === 0)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 py-8 sm:py-12">
        No featured products available
      </p>
    );

  const featured = products.slice(0, 5);

  return (
    <section className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-left mb-10 sm:mb-12 md:mb-16 tracking-tight"
      >
        Trending Products
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* Left Big Card */}
        {featured[0] && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow bg-white dark:bg-[#1c1f2e] flex flex-col"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/5]">
              <Image
                src={featured[0].images?.[0]?.url}
                alt={featured[0].name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 md:p-10 flex-1 flex flex-col">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                {featured[0].name}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 flex-1 mb-4">
                {featured[0].shortDescription}
              </p>
              <button className="buttons text-sm sm:text-base px-5 py-2.5 mt-4 self-start">
                Buy Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Right stacked small cards */}
        <div className="flex flex-col justify-between gap-6 lg:gap-8">
          {featured.slice(1, 3).map((product, idx) => (
            <motion.div
              key={product.sku}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow bg-white dark:bg-[#1c1f2e] flex flex-col flex-1"
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-[3/2]">
                <Image
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-1 space-y-2">
                <div className="flex flex-col space-y-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {featured[0].brand}
                  </p>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {featured[0].price} BDT
                  </p>
                </div>
                <button className="rounded-md text-white bg-[#00a88f] hover:bg-[#1a7f73] text-sm sm:text-base px-4 py-1.5 self-start">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row (2 more products) */}
        <div className="flex flex-col justify-between gap-6 lg:gap-8">
          {featured.slice(3, 5).map((product, idx) => (
            <motion.div
              key={product.sku}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow bg-white dark:bg-[#1c1f2e] flex flex-col flex-1"
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-[3/2]">
                <Image
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-1 space-y-2">
                <div className="flex flex-col space-y-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {featured[0].brand}
                  </p>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {featured[0].price} BDT
                  </p>
                </div>
                <button className="rounded-md text-white bg-[#00a88f] hover:bg-[#1a7f73] text-sm sm:text-base px-4 py-1.5 self-start">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All */}
      <div className="text-center mt-6 sm:mt-8 md:mt-10">
        <Link
          href={"/allProducts"}
          className="buttons text-sm sm:text-base"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
