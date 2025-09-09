"use client";

import { motion } from "framer-motion";
import { FaStar, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function ReviewCard({ name, image, product, review, rating }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col border border-[#008080] transition-all duration-300 h-[260px]"
    >
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-4">
        {image ? (
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#008080] shadow-md">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
        ) : (
          <FaUserCircle className="w-14 h-14 text-gray-400" />
        )}
        <div className="max-w-[180px]">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            Reviewed:{" "}
            <span className="font-medium text-[#008080]">{product}</span>
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex space-x-1 mt-auto mb-6">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500 w-5 h-5" />
        ))}
        {[...Array(5 - rating)].map((_, i) => (
          <FaStar key={i} className="text-gray-300 w-5 h-5" />
        ))}
      </div>

      {/* Review */}
      <p className="text-gray-700 text-base italic flex-1 leading-relaxed line-clamp-4">
        “{review}”
      </p>
    </motion.div>
  );
}
