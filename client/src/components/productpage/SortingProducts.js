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
        className="w-40 border border-[#008080] rounded px-3 py-2 text-[#008080] bg-white focus:outline-none"
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
              className="px-3 py-2 cursor-pointer text-[#008080] hover:bg-[#008080] hover:text-white"
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
