"use client";
import Link from "next/link";

const TopBar = ({ quickLinksLeft, quickLinksRight }) => (
  <div className="bg-[#00a88f] hidden sm:block dark:bg-[#161929] shadow-md text-white w-full py-1 sm:py-2 transition-transform duration-300 ease-in-out">
    <div className="w-11/12 mx-auto flex justify-between">
      <div className="flex items-center space-x-4">
        {quickLinksLeft.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="hover:underline text-xs lg:text-sm xl:text-sm 2xl:text-base"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        {quickLinksRight.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="hover:underline text-xs lg:text-sm xl:text-sm 2xl:text-base"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default TopBar;
