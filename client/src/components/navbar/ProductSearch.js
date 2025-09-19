"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";

const ProductSearch = () => {
  const { products, productIsLoading, productError } = useProducts();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filteredProducts =
    query.trim().length > 0
      ? products?.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <div className="relative w-full">
      {/* Search input */}
      <div className="flex items-center bg-white rounded-[6px] px-3 py-2 shadow-sm">
        <FiSearch className="text-gray-500 text-lg mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* Search results dropdown */}
      {focused && query && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg max-h-80 overflow-y-auto z-50">
          {productIsLoading && (
            <p className="p-3 text-sm text-gray-500">Loading products...</p>
          )}
          {productError && (
            <p className="p-3 text-sm text-red-500">Failed to load products</p>
          )}
          {filteredProducts && filteredProducts.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <li key={product.sku}>
                  <Link
                    href={`/main-layout/productDetails/${product?.slug}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
                  >
                    <span className="text-sm text-gray-700">
                      {product.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            !productIsLoading &&
            query.trim() && (
              <p className="p-3 text-sm text-gray-500">No products found</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
