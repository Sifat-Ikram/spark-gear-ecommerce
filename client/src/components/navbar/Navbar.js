"use client";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import { motion } from "framer-motion";

const quickLinksLeft = [
  { id: 1, label: "About Us", href: "/about" },
  { id: 2, label: "Blog", href: "/blog" },
  { id: 3, label: "How to Buy", href: "/how-to-buy" },
  { id: 4, label: "Stores", href: "/stores" },
];

const quickLinksRight = [
  { id: 1, label: "Track Order", href: "/track-order" },
  { id: 2, label: "Shipping Info", href: "/shipping" },
  { id: 3, label: "Returns & Refunds", href: "/returns" },
  { id: 4, label: "Support", href: "/support/contact" },
];

const Navbar = () => {
  return (
    <>
      <nav className="top-5 w-full left-0">
        <div className="flex flex-col">
          <TopBar
            quickLinksLeft={quickLinksLeft}
            quickLinksRight={quickLinksRight}
          />
        </div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-[#1a7f73] w-full"
        >
          <MainNav />
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
