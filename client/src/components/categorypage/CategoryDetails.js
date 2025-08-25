"use client";
import { motion } from "framer-motion";
import { useCategories } from "@/hooks/useCategories";

const CategoryDetails = ({ products, slug }) => {
  const { categories, categoryIsLoading, categoryError } = useCategories();

  if (categoryIsLoading) {
    return <div>Loading...</div>;
  }

  if (categoryError) {
    return <div>Error loading</div>;
  }
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === slug.toLowerCase()
  );
  console.log(category);

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {category.name}
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Browse our latest collection of{" "}
          <span className="font-medium text-primary">{category.name}</span> and
          find what suits you best.
        </p>
      </motion.div>
    </div>
  );
};

export default CategoryDetails;
