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
      <div className="w-full py-4 sm:py-6 lg:py-8 bg-[#173faf] shadow-md">
        <h1 className="text-center text-white text-lg sm:text-xl lg:text-2xl xl:text-4xl 2xl:text-6xl font-semibold exo">
          Product Details
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row lg:justify-between max-lg:gap-6">
        {/* Left Column - Description */}
        <div className="w-full lg:w-[48%] bg-white border border-gray-300 rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 space-y-3">
          <h2 className="subtitle-text roboto text-gray-800">Description</h2>
          <p className="text-sm sm:text-base 2xl:text-xl roboto leading-relaxed text-gray-600">
            {product.description}
          </p>
        </div>

        {/* Right Column - Specs */}
        <div className="w-full lg:w-[48%] flex flex-col space-y-3 md:space-y-4 2xl:space-y-8">
          {product.specs.map((spec) => (
            <div
              key={spec.name}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleSpec(spec.name)}
                className="w-full flex justify-between roboto items-center px-4 sm:px-5 py-3 sm:py-4 text-left font-medium text-[#173faf] hover:bg-gray-50 transition-all duration-200"
              >
                <span className="text-sm sm:text-base xl:text-lg 2xl:text-xl roboto">
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
                    className="px-4 sm:px-5 pb-4 text-gray-700 text-sm sm:text-base xl:text-lg 2xl:text-xl roboto roboto leading-relaxed"
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
