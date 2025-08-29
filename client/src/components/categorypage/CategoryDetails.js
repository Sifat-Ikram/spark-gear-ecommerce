"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import ProductSection from "../productpage/ProductSection";

const CategoryDetails = ({ products, category }) => {
  const type = "category";

  return (
    <div className="min-h-screen pt-5">
      <div className="w-11/12 mx-auto">
        <nav
          className="flex items-center space-x-2 text-gray-600 text-sm"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary font-medium">
            Home
          </Link>
          <FaChevronRight className="w-4 h-4" />
          <Link href="/allProduct" className="hover:text-primary font-medium">
            Products
          </Link>
          <FaChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-semibold">{category.name}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-5 py-20"
        >
          <h1 className="text-xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-bold text-gray-800">
            Explore Our {category.name} Collection
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Discover the best {category.name}s that we have to offer. Our
            collection is curated to provide you with only the finest options.
          </p>
        </motion.div>
      </div>
      <div>
        <ProductSection products={products} type={type} />
      </div>
    </div>
  );
};

export default CategoryDetails;
