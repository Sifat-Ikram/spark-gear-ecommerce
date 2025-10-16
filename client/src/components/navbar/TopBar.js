"use client";
import { useAuth } from "@/provider/AuthContext";
import Link from "next/link";

const TopBar = ({ quickLinksLeft, quickLinksRight }) => {
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <div className="bg-[#143694] shadow-md text-white w-full py-1.5 sm:py-2 2xl:py-4 transition-transform duration-300 ease-in-out">
      <div className="w-11/12 mx-auto flex justify-between">
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 lg:space-x-4 2xl:space-x-5">
          {quickLinksLeft.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="hover:underline text-[10px] lg:text-sm xl:text-sm 2xl:text-xl roboto font-extralight"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 lg:space-x-4 2xl:space-x-5">
          {quickLinksRight.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="hover:underline text-[10px] lg:text-sm xl:text-sm 2xl:text-xl roboto font-extralight"
            >
              {link.label}
            </Link>
          ))}

          {!user?.email ? (
            <Link
              href={"/login"}
              className="hover:underline text-[10px] lg:text-sm xl:text-sm 2xl:text-xl roboto font-extralight"
            >
              Login
            </Link>
          ) : (
            <h1
              onClick={() => handleLogout()}
              className="hover:underline cursor-pointer text-[10px] lg:text-sm xl:text-sm 2xl:text-xl roboto font-extralight"
            >
              LogOut
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
