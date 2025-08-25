"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductPageCard({ product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow p-4"
    >
      <div className="relative w-full h-40">
        <Image
          src={product.images[0]?.url}
          alt={product.images[0]?.alt || "Product image"}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.shortDescription}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-[#1a7f73] font-bold">
          ${product.price} {product.currency}
        </span>
        <span className="text-sm text-yellow-600">
          ⭐ {product.ratings.average}
        </span>
      </div>
    </motion.div>
  );
}
