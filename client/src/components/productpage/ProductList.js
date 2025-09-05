"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "./Pagination";
import ProductPageCard from "../card/ProductPageCard";

export default function ProductList({ products }) {
  const itemsPerPage = 11;
  const [page, setPage] = useState(1);

  const start = (page - 1) * itemsPerPage;
  const paginated = products.slice(start, start + itemsPerPage);

  return (
    <section className="w-full md:w-11/12 mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
        >
          {paginated.length > 0 ? (
            paginated.map((product) => (
              <ProductPageCard key={product.sku} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {products.length > itemsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(products.length / itemsPerPage)}
            onPageChange={setPage}
          />
        </div>
      )}
    </section>
  );
}
