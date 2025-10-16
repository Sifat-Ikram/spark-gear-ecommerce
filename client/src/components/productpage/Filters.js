"use client";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

export default function Filters({
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
}) {
  const handleReset = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setPrice(500);
    setRating("");
  };

  return (
    <aside className="h-full flex flex-col p-4 lg:p-6 xl:p-4 2xl:p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 lg:mb-4 2xl:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-[#173faf]">
          Filters
        </h2>
        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-[#173faf] transition"
          title="Reset Filters"
        >
          <FiRefreshCcw className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-6 md:gap-8 lg:gap-4">
        {/* Search */}
        <div>
          <label className="block font-medium text-sm sm:text-base 2xl:text-lg 3xl:text-xl mb-2 lg:mb-1 2xl:mb-2 3xl:mb-4">
            Search
          </label>
          <input
            type="text"
            placeholder="Product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 focus:border-[#173faf] focus:ring-1 
                       focus:ring-[#173faf] rounded-lg px-3 py-2 text-sm sm:text-base 
                       placeholder:text-gray-400 outline-none transition"
          />
        </div>

        {/* Category */}
        {type !== "category" && (
          <div>
            <label className="block font-medium text-sm sm:text-base 2xl:text-lg 3xl:text-xl mb-2 lg:mb-1 2xl:mb-2 3xl:mb-4">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 focus:border-[#173faf] focus:ring-1 
                         focus:ring-[#173faf] rounded-lg px-3 py-2 text-sm sm:text-base outline-none transition"
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Brand */}
        <div>
          <label className="block font-medium text-sm sm:text-base 2xl:text-lg 3xl:text-xl mb-2 lg:mb-1  2xl:mb2 3xl:mb-44">
            Brand
          </label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-gray-300 focus:border-[#173faf] focus:ring-1 
                       focus:ring-[#173faf] rounded-lg px-3 py-2 text-sm sm:text-base outline-none transition"
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
          <label className="block font-medium text-sm sm:text-base 2xl:text-lg 3xl:text-xl mb-3 lg:mb-1 2xl:mb-2 3xl:mb-4">
            Price (Up to ${price})
          </label>
          <input
            type="range"
            min="0"
            max="500"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-[#173faf]"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block font-medium text-sm sm:text-base 2xl:text-lg 3xl:text-xl mb-3 lg:mb-1 2xl:mb-2 3xl:mb-4">
            Minimum Rating
          </label>
          <div className="space-y-2">
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
                  className="accent-[#173faf]"
                />
                <span className="flex items-center text-sm sm:text-base text-gray-700">
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
                <span className="text-gray-500 text-sm sm:text-base">{r}+</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
