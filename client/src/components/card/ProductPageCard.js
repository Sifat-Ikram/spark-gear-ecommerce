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
      className="bg-gray-50 rounded-xl shadow h-[320px] flex flex-col"
    >
      <Link
        href={`/main-layout/productDetails/${product?.slug}`}
        className="flex flex-col h-full"
      >
        <div className="relative w-full h-40">
          <Image
            src={imageUrl}
            alt={product?.images?.[0]?.alt || "Product image"}
            fill
            className="object-cover rounded-lg bg-gray-100"
          />
        </div>

        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-semibold">{product?.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-3">
              {product?.shortDescription}
            </p>
          </div>

          <div className="mt-6 flex justify-between items-center">
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
