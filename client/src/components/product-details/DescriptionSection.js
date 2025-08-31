"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const DescriptionSection = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSpec = (name) => {
    setActiveIndex(activeIndex === name ? null : name);
  };

  return (
    <div className="flex flex-col space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="w-full py-4 sm:py-6 lg:py-8 bg-[#1a7f73] shadow-md">
        <h1 className="text-center text-white text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-semibold">
          Product Description
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row lg:justify-between max-lg:gap-6">
        {/* Left Column - Description */}
        <div className="w-full lg:w-[48%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 space-y-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100">
            Description
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {product.description}
          </p>
        </div>

        {/* Right Column - Specs */}
        <div className="w-full lg:w-[48%] flex flex-col justify-between">
          {product.specs.map((spec) => (
            <div
              key={spec.name}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleSpec(spec.name)}
                className="w-full flex justify-between items-center px-4 sm:px-5 py-3 sm:py-4 text-left font-medium text-[#008080] dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <span className="text-sm sm:text-base lg:text-lg">
                  {spec.name}
                </span>
                {activeIndex === spec.name ? (
                  <FaChevronUp className="text-sm sm:text-base" />
                ) : (
                  <FaChevronDown className="text-sm sm:text-base" />
                )}
              </button>

              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {activeIndex === spec.name && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-5 pb-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                  >
                    {spec.value}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
