"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import FeaturedCard from "@/components/card/FeaturedCard";

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

  const featured = products.sort(() => 0.5 - Math.random()).slice(0, 10);

  return (
    <section className="w-full min-h-screen flex flex-col justify-between">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-left mb-4 sm:mb-6 md:mb-8 tracking-tight"
      >
        Trending Products
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-3 flex-1 overflow-hidden">
        {featured?.map((product) => (
          <FeaturedCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
