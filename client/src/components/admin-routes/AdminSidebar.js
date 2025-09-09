"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MdLogout } from "react-icons/md";
import {
  FiHome,
  FiUsers,
  FiBox,
  FiPlusCircle,
  FiShoppingCart,
  FiFileText,
  FiTag,
  FiMenu,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/provider/AuthContext";
import Link from "next/link";

const routes = [
  {
    name: "Dashboard",
    icon: FiHome,
    path: "/admin/dashboard",
    roles: ["admin"],
  },
  { name: "Users", icon: FiUsers, path: "/admin/users", roles: ["admin"] },
  { name: "Products", icon: FiBox, path: "/admin/products", roles: ["admin"] },
  { name: "Orders", icon: FiFileText, path: "/admin/orders", roles: ["admin"] },
  { name: "Cart", icon: FiShoppingCart, path: "/admin/cart", roles: ["admin"] },
  {
    name: "Add Product",
    icon: FiPlusCircle,
    path: "/admin/add-product",
    roles: ["admin"],
  },
  {
    name: "Add Category",
    icon: FiTag,
    path: "/admin/add-category",
    roles: ["admin"],
  },
];

export default function AdminSidebar() {
  const router = useRouter();
  const { user, loading, logOut } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (loading) return null;

  console.log(user);
  

  const visibleRoutes =
    !loading && user?.role
      ? routes.filter((route) => route.roles.includes(user?.role))
      : [];

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <div>
      <aside className="hidden md:flex flex-col w-full min-h-screen bg-[#008080] text-white sticky top-0">
        <div className="text-2xl font-bold p-6 border-b border-[#008080]">
          Admin Panel
        </div>
        <nav className="flex-1 flex flex-col justify-between px-3 py-2 lg:py-4">
          <div>
            {visibleRoutes.map((route) => {
              const isActive = pathname === route.path;
              const Icon = route.icon;
              return (
                <Link key={route.name} href={route.path}>
                  <motion.div
                    className={`flex items-center gap-2 lg:gap-3 px-6 py-2 lg:py-3 cursor-pointer rounded-lg transition-colors duration-200 
                ${isActive ? "bg-[#008080]" : "hover:bg-[#016b6b]"}`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="text-lg" />
                    <span>{route.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
          <div>
            <motion.button
              onClick={() => handleLogout()}
              className="w-full flex items-center gap-3 rounded-lg px-6 py-3 hover:bg-[#016b6b] cursor-pointer transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              <MdLogout className="text-lg" />
              <span>Logout</span>
            </motion.button>
          </div>
        </nav>
      </aside>
      <div className="md:hidden w-full bg-[#008080] sticky top-0 z-50">
        <div className="w-11/12 mx-auto text-white flex items-center justify-between">
          <div className="text-xl font-bold">Admin Panel</div>
          <button onClick={() => setOpen(!open)} className="py-4">
            <FiMenu className="text-2xl" />
          </button>
        </div>
        {open && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-14 w-36 sm:w-48 bg-[#008080] text-white rounded-b-md shadow-lg flex flex-col z-50"
          >
            <div>
              {visibleRoutes.map((route) => {
                const isActive = pathname === route.path;
                return (
                  <Link key={route.name} href={route.path}>
                    <motion.div
                      className={`flex items-center justify-center px-2 sm:px-6 py-1.5 sm:py-3 cursor-pointer transition-colors duration-200 
                  ${isActive ? "bg-[#008080]" : "hover:bg-[#016b6b]"}`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="text-base text-center sm:text-xl">
                        {route.name}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
            <div>
              <motion.button
                onClick={() => handleLogout()}
                className="w-full flex items-center justify-center px-2 sm:px-6 py-1.5 sm:py-3 hover:bg-[#016b6b] cursor-pointer transition-colors duration-200"
              >
                <span>Logout</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
