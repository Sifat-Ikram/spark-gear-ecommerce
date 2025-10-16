"use client";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
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
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options = [
    { value: "", label: "Sort by" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
  ];

  const selected = options.find((opt) => opt.value === sort);

  return (
    <div>
      <div className="bg-[#173faf] text-white shadow px-2 py-4 sm:px-4 md:px-6 lg:px-7 2xl:px-8 2xl:py-5">
        <div className="flex justify-between items-center">
          {/* Filters Button */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <FaBars
              onClick={() => setIsOpen(true)}
              className="text-white text-sm sm:text-lg cursor-pointer lg:hidden"
            />
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-5xl font-semibold text-nowrap">
              Available Products
            </span>
          </div>

          {/* Custom Sort Dropdown */}
          <div ref={dropdownRef} className="relative inline-block text-left">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-40 xl:w-48 2xl:w-64 flex items-center justify-between border border-[#173faf] rounded-lg p-2 xl:p-3 2xl:p-5 text-[#173faf] bg-white focus:outline-none
              font-semibold text-sm sm:text-base lg:text-lg 2xl:text-3xl"
            >
              {selected ? selected.label : "Sort by"}
              {isDropdownOpen ? (
                <FaChevronUp className="mt-1" />
              ) : (
                <FaChevronDown className="mt-1" />
              )}
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 w-40 xl:w-48 2xl:w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {options.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setIsDropdownOpen(false);
                    }}
                    className="cursor-pointer text-[#173faf] hover:bg-[#173faf] hover:rounded-lg p-2 xl:p-3 2xl:p-5 hover:text-white font-semibold text-sm sm:text-base 2xl:text-2xl text-center"
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
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 overflow-y-auto lg:hidden"
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
