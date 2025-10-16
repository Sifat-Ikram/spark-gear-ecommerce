"use client";
import { useState } from "react";

const SortingProducts = ({ sort, setSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
  ];
  return (
    <div className="relative inline-block text-left">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-40 border border-[#173faf] rounded px-3 py-2 text-[#173faf] bg-white focus:outline-none"
      >
        {selected ? selected.label : "Sort by"}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                setSort(opt.value);
                setIsOpen(false);
              }}
              className="px-3 py-2 cursor-pointer text-[#173faf] hover:bg-[#173faf] hover:text-white"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortingProducts;
