"use client";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

export default function Filters({
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
  const handleReset = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setPrice(500);
    setRating("");
  };

  return (
    <aside className="h-full flex flex-col max-xl:space-y-4 space-y-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-[#1a7f73]">
          Filters
        </h2>
        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-[#1a7f73] transition"
          title="Reset Filters"
        >
          <FiRefreshCcw size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col space-y-3 lg:space-y-2 xl:space-y-5 2xl:space-y-10">
        {/* Search */}
        <div>
          <label className="block text-gray-700 font-medium max-xl:mb-1 2xl:mb-3">
            Search
          </label>
          <input
            type="text"
            placeholder="Product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 focus:border-[#1a7f73] focus:ring-1 
                       focus:ring-[#1a7f73] rounded-lg px-3 py-2 text-sm lg:text-base outline-none transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium max-xl:mb-1 2xl:mb-3">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 focus:border-[#1a7f73] focus:ring-1 
                       focus:ring-[#1a7f73] rounded-lg px-3 py-2 text-sm lg:text-base outline-none transition"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-gray-700 font-medium max-xl:mb-1 2xl:mb-3">
            Brand
          </label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-gray-300 focus:border-[#1a7f73] focus:ring-1 
                       focus:ring-[#1a7f73] rounded-lg px-3 py-2 text-sm lg:text-base outline-none transition"
          >
            <option value="">All</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Price (Up to ${price})
          </label>
          <input
            type="range"
            min="0"
            max="500"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-[#1a7f73]"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Minimum Rating
          </label>
          <div className="space-y-1">
            {[5, 4.5, 4, 3].map((r) => (
              <label
                key={r}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  value={r}
                  checked={rating === r}
                  onChange={() => setRating(Number(r))}
                  className="accent-[#1a7f73]"
                />
                <span className="flex items-center text-sm text-gray-700">
                  {/* Render stars based on value */}
                  {Array.from({ length: 5 }).map((_, i) => {
                    if (i + 1 <= Math.floor(r))
                      return <FaStar key={i} className="text-yellow-400" />;
                    if (i + 0.5 === r)
                      return (
                        <FaStarHalfAlt key={i} className="text-yellow-400" />
                      );
                    return <FaRegStar key={i} className="text-yellow-400" />;
                  })}
                </span>
                <span className="text-gray-500 ml-1">{r}+ </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
