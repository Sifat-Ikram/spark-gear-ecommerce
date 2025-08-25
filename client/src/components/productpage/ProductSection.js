"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Filters from "./Filters";
import ProductList from "./ProductList";
import FilterBar from "./FilterBar";

export default function ProductSection({ products }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(500);
  const [rating, setRating] = useState("");

  // unique categories & brands from products
  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category ? p.category === category : true;
      const matchBrand = brand ? p.brand === brand : true;
      const matchPrice = p.price <= price;
      const matchRating = rating ? p.ratings?.average >= rating : true;

      return (
        matchSearch && matchCategory && matchBrand && matchPrice && matchRating
      );
    });
  }, [products, search, category, brand, price, rating]);

  return (
    <div>
      <FilterBar
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
      <div className="flex">
        <div className="hidden lg:flex flex-col w-1/5 bg-white border-r-2 border-[#1a7f73] shadow-lg sticky top-10 h-screen p-4">
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
        </div>

        <div className="md:flex-1 w-11/12 mx-auto gap-6 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={filteredProducts.length}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductList products={filteredProducts} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
