"use client";
import Link from "next/link";

const TopBar = ({ quickLinksLeft, quickLinksRight }) => (
  <div className="bg-[#016b6b] hidden sm:block shadow-md text-white w-full py-1 sm:py-2 2xl:py-4 transition-transform duration-300 ease-in-out">
    <div className="w-11/12 mx-auto flex justify-between">
      <div className="flex items-center space-x-4 2xl:space-x-5">
        {quickLinksLeft.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="hover:underline text-xs lg:text-sm xl:text-sm 2xl:text-xl roboto"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4 2xl:space-x-5">
        {quickLinksRight.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="hover:underline text-xs lg:text-sm xl:text-sm 2xl:text-xl roboto"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default TopBar;
