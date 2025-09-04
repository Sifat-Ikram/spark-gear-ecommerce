"use client";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

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
  const [showTopBar, setShowTopBar] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowTopBar(false);
      } else {
        setShowTopBar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showTopBarOnPage = pathname === "/" && showTopBar;

  return (
    <>
      <nav className="w-full sticky top-0 z-50">
        <AnimatePresence>
          {showTopBarOnPage && (
            <div>
              <TopBar
                quickLinksLeft={quickLinksLeft}
                quickLinksRight={quickLinksRight}
              />
            </div>
          )}
        </AnimatePresence>
        <div className="bg-[#1a7f73] w-full">
          <MainNav />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
