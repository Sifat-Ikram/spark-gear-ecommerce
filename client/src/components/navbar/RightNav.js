"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import SearchOverlay from "./SearchOverlay";
import { useAuth } from "@/provider/AuthContext";
import { useCart } from "@/provider/CartContext";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

const RightNav = ({ categoryIsLoading, categoryError, navItems }) => {
  const { openCart } = useCart();
  const { user } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  if (categoryError) {
    return <h1>Error fetching categories!!!</h1>;
  }

  return (
    <div className="flex items-center space-x-3.5 2xl:space-x-4 text-lg font-medium">
      <div className="hidden sm:flex items-center space-x-2 md:space-x-4 lg:space-x-6 2xl:space-x-8">
        {navItems.map((item, idx) =>
          item.dropdown ? (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button className="py-3 md:py-5 2xl:py-8 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-3xl roboto font-normal cursor-pointer transition-colors">
                {item.label}
              </button>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -left-2/3 2xl:-left-1/2 -translate-x-2/3 2xl:-translate-x-1/2 bg-white roboto shadow-xl rounded-lg p-3 z-50
                             grid grid-cols-3 lg:grid-cols-4
                             gap-2 w-[500px] md:w-[700px]"
                >
                  {categoryIsLoading ? (
                    <span className="col-span-full text-center text-gray-500">
                      Loading...
                    </span>
                  ) : (
                    item.dropdown.map((cat) => (
                      <Link
                        href={cat.link}
                        key={cat.label}
                        className="flex flex-col items-center p-1 rounded-lg hover:bg-gray-100 transition"
                      >
                        <Image
                          src={cat.image}
                          alt={cat.label}
                          height={80}
                          width={80}
                          className="w-20 h-20 object-cover rounded-full shadow-sm mb-2"
                        />
                        <span className="text-sm font-medium text-gray-700 text-center cursor-pointer roboto">
                          {cat.label}
                        </span>
                      </Link>
                    ))
                  )}
                </motion.div>
              )}
            </div>
          ) : (
            <Link
              key={idx}
              href={item.link}
              className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-3xl font-normal transition-colors roboto"
            >
              {item.label}
            </Link>
          )
        )}
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-2 md:space-x-2 lg:space-x-3 2xl:space-x-5">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="cursor-pointer block lg:hidden"
        >
          <FiSearch onClick={setShowSearch} className="text-sm md:text-base" />
        </motion.div>
        <motion.div
          onClick={openCart}
          whileHover={{ scale: 1.2 }}
          className="relative cursor-pointer"
        >
          <FiShoppingCart className="text-sm md:text-base 2xl:text-3xl" />
        </motion.div>
        <motion.div>
          {user?.email && (
            <div className="flex items-center space-x-2 2xl:space-x-3">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="cursor-pointer"
              >
                <Link href={`/main-layout/user-profile/${user.id}`}>
                  <FaUser className="text-sm :text-base" />
                </Link>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </div>
  );
};

export default RightNav;
