"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const MobileMenu = ({
  navItems,
  user,
  menuOpen,
  setMenuOpen,
  handleLogout,
}) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  if (!menuOpen) return null;

  return (
    <motion.div
      className="md:hidden bg-[#1a7f73] dark:bg-[#161929] shadow-lg py-1 absolute z-40 w-32 sm:w-40 text-center sm:text-right right-0 top-[48px]"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {navItems.map((item, index) => (
        <div key={item.label} className="group">
          <h1
            onClick={() => toggleDropdown(index)}
            className="block text-white hover:cursor-pointer px-2 sm:px-5 py-3 border-y-[0.05px] border-transparent hover:border-white transition-all duration-300"
          >
            {item.label}
          </h1>

          {item.dropdown && openDropdownIndex === index && (
            <div className="bg-[#1a7f73] dark:bg-[#161929] shadow-lg rounded-md w-auto space-y-2 py-2">
              {item.dropdown.map((dropdownItem) => (
                <Link
                  key={dropdownItem.label}
                  href={dropdownItem.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white px-2 sm:px-5 hover:cursor-pointer whitespace-nowrap"
                >
                  {dropdownItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      {user ? (
        <h1
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
          className="block text-white hover:cursor-pointer px-2 sm:px-5 py-3 border-y-[0.05px] border-transparent hover:border-white"
        >
          Logout
        </h1>
      ) : (
        <>
          <Link href="/auth/login">
            <h1
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:cursor-pointer px-2 sm:px-5 py-3 border-y-[0.05px] border-transparent hover:border-white"
            >
              Login
            </h1>
          </Link>
          <Link href="/auth/register">
            <h1
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:cursor-pointer px-2 sm:px-5 py-3 border-t-[0.05px] border-transparent hover:border-white"
            >
              Register
            </h1>
          </Link>
        </>
      )}
    </motion.div>
  );
};

export default MobileMenu;
