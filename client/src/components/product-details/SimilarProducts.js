"use client";

import { motion } from "framer-motion";
import FeaturedCard from "../card/FeaturedCard";
import { useProductByCategory } from "@/hooks/useProductByCategory";
import Link from "next/link";

const SimilarProducts = ({ category, productName }) => {
  const { products } = useProductByCategory(category);
  const similarProducts = products.filter((prod) => prod.name !== productName);
  const featured = similarProducts.sort(() => 0.5 - Math.random()).slice(0, 10);

  return (
    <section className="w-11/12 mx-auto flex flex-col justify-between">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="exo title-text text-left mb-4 sm:mb-6 md:mb-8 tracking-tight"
      >
        You may also like
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 lg:gap-5 2xl:gap-6 flex-1 overflow-hidden">
        {featured?.map((product) => (
          <FeaturedCard key={product._id} product={product} />
        ))}
      </div>
      <div className="w-full flex justify-center items-center mt-5">
        <Link className="w-1/3 mx-auto" href={"/allProduct"}>
          <button className="w-full buttons">See more</button>
        </Link>
      </div>
    </section>
  );
};

export default SimilarProducts;
