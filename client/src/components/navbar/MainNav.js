"use client";

import { motion } from "framer-motion";
import { GrMenu } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import RightNav from "./RightNav";

const MainNav = () => {
  return (
    <div className="w-11/12 mx-auto flex justify-between items-center text-white">
      <div className="flex items-center space-x-3">
        <GrMenu className="block sm:hidden text-sm cursor-pointer" />
        <Link href={"/"}>
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight"
          >
            Spark Gear
          </motion.h1>
        </Link>
      </div>

      <div className="relative hidden lg:flex items-center w-[600px] bg-white rounded-[6px] px-3 py-2 shadow-sm">
        <FiSearch className="absolute left-3 text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none pl-10 w-full text-sm text-gray-700 placeholder-gray-500"
        />
      </div>

      <RightNav />
    </div>
  );
};

export default MainNav;
