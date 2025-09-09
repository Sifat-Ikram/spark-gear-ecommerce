"use client";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Filters from "./Filters";

export default function FilterBar({
  type,
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
  sort,
  setSort,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { value: "", label: "Sort by" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
  ];

  const selected = options.find((opt) => opt.value === sort);

  return (
    <div>
      <div className="bg-[#008080] text-white shadow px-2 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5">
        <div className="flex justify-between items-center">
          {/* Filters Button */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <FaBars
              onClick={() => setIsOpen(true)}
              className="text-white text-sm sm:text-lg cursor-pointer lg:hidden"
            />
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-4xl font-semibold text-nowrap">
              Available Products
            </span>
          </div>

          {/* Custom Sort Dropdown */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-40 border border-[#008080] rounded px-3 py-2 text-[#008080] bg-white focus:outline-none"
            >
              {selected ? selected.label : "Sort by"}
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                {options.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setIsDropdownOpen(false);
                    }}
                    className="px-3 py-2 cursor-pointer text-[#008080] hover:bg-[#008080] hover:text-white"
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar for Filters (Mobile) */}
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
                type={type}
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
