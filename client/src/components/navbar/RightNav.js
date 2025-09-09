"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import SearchOverlay from "./SearchOverlay";
import { useAuth } from "@/provider/AuthContext";
import { useCart } from "@/provider/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

const RightNav = ({ categoryIsLoading, categoryError, navItems }) => {
  const { openCart } = useCart();
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);

  if (categoryError) {
    return <h1>Error fetching categories!!!</h1>;
  }

  return (
    <div className="flex items-center space-x-3.5 text-lg font-medium">
      <div className="hidden sm:flex items-center space-x-2 md:space-x-4 lg:space-x-6 2xl:space-x-8">
        {navItems.map((item, idx) =>
          item.dropdown ? (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button className="py-3 md:py-5 text-xs sm:text-base md:text-sm lg:text-base 2xl:text-lg font-normal transition-colors">
                {item.label}
              </button>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -left-2/3 -translate-x-2/3 bg-white shadow-xl rounded-lg p-3 z-50
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
                        <span className="text-sm font-medium text-gray-700 text-center cursor-pointer">
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
              className="text-xs sm:text-base md:text-sm lg:text-base 2xl:text-lg font-normal transition-colors"
            >
              {item.label}
            </Link>
          )
        )}
        {!user?.email && (
          <Link
            href={"/login"}
            className="text-xs sm:text-base md:text-sm lg:text-base 2xl:text-lg font-normal"
          >
            Login
          </Link>
        )}
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-3.5 md:space-x-4 lg:space-x-6 2xl:space-x-8">
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
          <FiShoppingCart className="text-sm md:text-base" />
          <span className="absolute -bottom-1 -right-2 bg-white text-gray-800 text-[10px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
            3
          </span>
        </motion.div>
        <motion.div>
          {user?.email && (
            <div
              className="relative"
              onMouseEnter={() => setOpenUserDropdown(true)}
              onMouseLeave={() => setOpenUserDropdown(false)}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="cursor-pointer"
                onClick={() => setOpenUserDropdown((prev) => !prev)}
              >
                <FaUser className="text-sm md:text-base" />
              </motion.div>

              <AnimatePresence>
                {openUserDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 w-40 rounded-lg shadow-lg z-50"
                  >
                    <ul className="flex flex-col mt-5 sm:mt-4 md:mt-[22px] lg:mt-10 space-y-[1px] w-full bg-[#008080] rounded-b-lg overflow-hidden">
                      <li>
                        <Link
                          href="/profile"
                          onClick={() => setOpenUserDropdown(false)}
                          className="block text-center py-2 transition text-white w-full hover:bg-[#016b6b]"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            logout();
                            setOpenUserDropdown(false);
                          }}
                          className="w-full text-center py-2 transition text-white hover:bg-[#016b6b]"
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </div>
  );
};

export default RightNav;
