"use client";
import Link from "next/link";

const DropdownMenu = ({ item, showTopBar, isTransparent }) => {
  return (
    <div className="relative group hover:cursor-pointer">
      <button
        className={`cursor-pointer transition-colors duration-200 font-medium py-[2px] sm:py-1 lg:py-[14px] ${
          showTopBar
            ? isTransparent
              ? "text-white"
              : "text-white dark:text-white"
            : "text-white dark:text-white"
        }`}
      >
        {item.label}
      </button>

      {item.dropdown && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 group-hover:block hidden z-40 w-max bg-[#1a7f73] dark:bg-[#161929] rounded-md shadow-xl transition-all duration-300 ease-out animate-fadeInUp">
          {item.dropdown.map((dropdownItem) => (
            <Link
              key={dropdownItem.label}
              href={dropdownItem.href}
              className="block text-gray-100 dark:text-gray-100 hover:bg-white hover:text-gray-800 dark:hover:text-gray-800 rounded px-5 py-2 transition-colors duration-200 whitespace-nowrap"
            >
              {dropdownItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
