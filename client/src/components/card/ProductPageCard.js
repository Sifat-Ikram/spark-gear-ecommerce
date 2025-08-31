"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductPageCard({ product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow"
    >
      <Link href={`/productDetails/${product?.slug}`}>
        <div className="relative w-full h-40">
          <Image
            src={product.images[0]?.url}
            alt={product.images[0]?.alt || "Product image"}
            fill
            className="object-cover rounded-lg bg-gray-100"
          />
        </div>
        <div className="bg-gray-50 p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.shortDescription}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-[#1a7f73] font-bold">
              {product.price} BDT
            </span>
            <span className="text-sm text-yellow-600">
              ⭐ {product.ratings.average}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
