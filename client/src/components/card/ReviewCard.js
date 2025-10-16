"use client";

import { motion } from "framer-motion";
import { FaRegStar, FaStar, FaStarHalfAlt, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function ReviewCard({ review }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col border border-[#173faf] transition-all duration-300 h-[260px]"
    >
      {/* User Info */}
      <div className="flex items-center space-x-2.5 sm:space-x-4 mb-4">
        {review?.review?.reviewer?.image ? (
          <div className="flex-shrink-0 rounded-full overflow-hidden border-2 border-[#173faf] shadow-md">
            <Image
              src={review?.review?.reviewer?.image}
              alt={review?.review?.reviewer?.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 rounded-full overflow-hidden border-2 border-[#173faf] shadow-md">
            <FaUserCircle className="w-[40px] h-[40px] text-gray-400" />
          </div>
        )}

        <div className="max-w-[180px]">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {review?.review?.reviewer?.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            Reviewed:{" "}
            <span className="font-medium text-[#173faf]">
              {review?.productName}
            </span>
          </p>
        </div>
      </div>

      <div className="flex space-x-1 mt-auto mb-6">
        {/* Full stars */}
        {[...Array(Math.floor(review?.averageRating || 0))].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500 w-5 h-5" />
        ))}

        {/* Half star */}
        {review?.averageRating % 1 >= 0.5 && (
          <FaStarHalfAlt className="text-yellow-500 w-5 h-5" />
        )}

        {/* Empty stars */}
        {[...Array(5 - Math.ceil(review?.averageRating || 0))].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-300 w-5 h-5" />
        ))}
      </div>

      <p className="text-gray-700 text-base italic flex-1 leading-relaxed line-clamp-4">
        “{review?.review?.review}”
      </p>
    </motion.div>
  );
}
