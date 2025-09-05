"use client";

import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";

export default function ProductFilter({
  categories,
  onSearch,
  onCategoryChange,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onCategoryChange(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 shadow rounded-md p-2 md:p-3 xl:p-4 2xl:p-5 mb-4 gap-4 md:gap-6">
      {/* Search and Category */}
      <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by product name..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a7f73] transition-all shadow-sm"
          />
        </div>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a7f73] transition-all shadow-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button className="flex items-center gap-2 px-5 py-2 bg-[#1a7f73] text-white font-medium rounded-lg hover:bg-[#16695f] transition-all shadow-md">
        <FiPlus size={18} /> Add Product
      </button>
    </div>
  );
}
