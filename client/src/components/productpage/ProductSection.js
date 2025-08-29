"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Filters from "./Filters";
import ProductList from "./ProductList";
import FilterBar from "./FilterBar";

export default function ProductSection({ products, type }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(500);
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");
  console.log(products);

  // unique categories & brands from products
  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category ? p.category === category : true;
      const matchBrand = brand ? p.brand === brand : true;
      const matchPrice = p.price <= price;
      const matchRating = rating ? p.ratings?.average >= rating : true;

      return (
        matchSearch && matchCategory && matchBrand && matchPrice && matchRating
      );
    });

    // Sorting
    if (sort === "price_low")
      result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price_high")
      result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, search, category, brand, price, rating, sort]);

  console.log(filteredProducts);
  

  return (
    <div>
      <FilterBar
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
        sort={sort}
        setSort={setSort}
      />
      <div className="flex">
        <div className="hidden lg:flex flex-col w-1/5 bg-white border-r-2 border-gray-300 shadow sticky top-10 h-screen p-4">
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
