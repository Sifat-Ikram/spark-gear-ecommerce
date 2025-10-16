"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RightNav from "./RightNav";
import { AnimatePresence, motion } from "framer-motion";
import { GrMenu } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";
import slugify from "slugify";
import ProductSearch from "./ProductSearch";

const MainNav = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const { categories, categoryIsLoading, categoryError } = useCategories();

  const navItems = [
    {
      label: "Products",
      link: "/main-layout/allProduct",
    },
    {
      label: "Categories",
      dropdown: categories?.map((cat) => ({
        label: cat.name,
        link: `/main-layout/category/${slugify(cat.name, { lower: true })}`,
        image: cat.image,
      })),
    },
    {
      label: "About us",
      link: "/main-layout/aboutUs",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className="w-11/12 mx-auto flex justify-between items-center text-white"
    >
      <div className="flex items-center space-x-[2px]">
        <div className="relative">
          <div
            onClick={() => setMenuOpen((prev) => !prev)}
            className="block sm:hidden cursor-pointer py-5 px-2"
          >
            <GrMenu className="text-white text-xl" />
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="sm:hidden absolute top-full left-0 mobile-nav bg-gray-50 rounded-b-lg shadow-lg z-50 flex"
              >
                <ul className="relative flex flex-col space-y-[1px] w-full bg-[#173faf] roboto">
                  {navItems.map((item, idx) => (
                    <li key={idx}>
                      {item.link ? (
                        <Link
                          href={item.link}
                          onClick={() => setMenuOpen(false)}
                          className="block text-center py-2 transition text-white w-full"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          onClick={() => setShowCategories((prev) => !prev)}
                          className="text-center py-2 transition text-white w-full"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <AnimatePresence>
                  {showCategories && (
                    <motion.div
                      transition={{ duration: 0.2 }}
                      className="mobile-categories"
                    >
                      {categories?.map((cat) => (
                        <Link
                          key={cat._id}
                          href={`/category/${cat._id}`}
                          onClick={() => setMenuOpen(false)}
                          className="flex flex-col items-center py-1 rounded-lg bg-gray-100 transition"
                        >
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 object-cover rounded-full mb-1"
                          />
                          <span className="text-xs text-gray-700 text-center roboto">
                            {cat.name}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Link href={"/"}>
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="font-bold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl exo tracking-tight"
          >
            Spark Gear
          </motion.h1>
        </Link>
      </div>

      <div className="relative hidden lg:flex items-center lg:w-[400px] xl:w-[450px] 2xl:w-[600px]">
        <ProductSearch />
      </div>

      <RightNav
        categoryIsLoading={categoryIsLoading}
        categoryError={categoryError}
        navItems={navItems}
      />
    </div>
  );
};

export default MainNav;
