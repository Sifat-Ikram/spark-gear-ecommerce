"use client";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";

const MainNav = ({
  navItems,
  user,
  showTopBar,
  isTransparent,
  toggleSearch,
  menuOpen,
  setMenuOpen,
  handleLogout,
}) => {
  return (
    <div
      className={`w-full relative transition-all duration-300 ${
        showTopBar
          ? isTransparent
            ? "translate-y-0 bg-[#1a7f73]"
            : "translate-y-0 bg-[#1a7f73] dark:bg-[#161929] shadow"
          : "-translate-y-[45px] md:-translate-y-[58px] bg-[#1a7f73] dark:bg-[#161929] shadow mt-5"
      }`}
    >
      <div className="w-11/12 mx-auto flex justify-between items-center shadow">
        <Link href="/" className="flex items-center">
          <span
            className={`exo text-4xl font-bold py-2 ${
              showTopBar
                ? isTransparent
                  ? "text-white dark:text-white"
                  : "dark:text-white text-white"
                : "dark:text-white text-white"
            }`}
          >
            Spark Gear
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <DropdownMenu
              key={item.label}
              item={item}
              showTopBar={showTopBar}
              isTransparent={isTransparent}
            />
          ))}

          {/* Search + Auth */}
          <div
            className={`flex items-center space-x-4 px-4 py-1 bg-white/30 rounded-md backdrop-blur-md text-white/90 transition-all duration-300 ${
              showTopBar
                ? "backdrop-blur-md text-white/80 hover:text-white"
                : "dark:bg-white/20 dark:text-white"
            }`}
          >
            <button
              onClick={toggleSearch}
              aria-label="Open search"
              className="hover:text-gray-900 rounded"
            >
              <FiSearch size={20} />
            </button>
            <div className="border-l border-white/50 h-5" />
            {user ? (
              <button
                onClick={handleLogout}
                className="hover:text-gray-900 rounded font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="hover:text-gray-900 rounded font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:hidden">
          <button onClick={toggleSearch} className="text-white dark:text-white">
            <FiSearch className="font-black text-xl sm:text-2xl cursor-pointer" />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white dark:text-white py-5"
          >
            {menuOpen ? (
              <FaTimes className="font-black text-xl sm:text-2xl" />
            ) : (
              <FaBars className="font-black text-xl sm:text-2xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
