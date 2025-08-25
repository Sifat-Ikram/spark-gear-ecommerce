"use client";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Filters from "./Filters";

export default function FilterBar({
  categories,
  brands,
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  price,
  setPrice,
  rating,
  setRating,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="bg-[#1a7f73] text-white shadow px-2 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5">
        <div className="flex justify-between items-center">
          {/* Left Section: Menu + Title */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <FaBars
              onClick={() => setIsOpen(true)}
              className="text-white text-sm sm:text-lg block lg:hidden"
            />
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-nowrap">
              Available Products
            </span>
          </div>

          {/* Right Section: Sort Dropdown */}
          <div>
            <select className="max-sm:w-28 text-sm sm:text-base md:text-lg border text-gray-800 bg-white border-[#1a7f73] rounded px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-[#1a7f73]">
              <option>Sort by</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 p-6 overflow-y-auto lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Filters
                categories={categories}
                brands={brands}
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                brand={brand}
                setBrand={setBrand}
                price={price}
                setPrice={setPrice}
                rating={rating}
                setRating={setRating}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
