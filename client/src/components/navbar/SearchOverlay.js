"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

export default function SearchOverlay({ isOpen, onClose }) {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const { products, productIsLoading, productError } = useProducts();
  const [query, setQuery] = useState("");

  const filteredProducts =
    query.trim().length > 0
      ? products?.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Auto focus input when open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={containerRef}
            className="relative w-full max-w-lg bg-white/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/30"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-3 right-3 text-gray-700 hover:text-gray-900 transition"
              aria-label="Close search overlay"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Title */}
            <h2 className="text-center text-xl font-semibold text-gray-800 mb-5">
              Search the site
            </h2>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="What are you looking for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base bg-white bg-opacity-90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
            </form>
            <div className="mt-4 max-h-64 overflow-y-auto bg-white/80 backdrop-blur rounded-lg shadow-inner border border-gray-200">
              {productIsLoading && (
                <p className="p-3 text-sm text-gray-500">Loading products...</p>
              )}
              {productError && (
                <p className="p-3 text-sm text-red-500">
                  Failed to load products
                </p>
              )}
              {filteredProducts && filteredProducts.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <li key={product._id}>
                      <Link
                        href={`/main-layout/productDetails/${product?.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
                        onClick={onClose}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
