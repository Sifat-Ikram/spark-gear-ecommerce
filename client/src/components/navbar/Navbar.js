"use client";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const quickLinksLeft = [
  { id: 3, label: "Stores", href: "/stores" },
  { id: 4, label: "Support", href: "/support/contact" },
];

const quickLinksRight = [
  { id: 1, label: "Blog", href: "/blog" },
  { id: 2, label: "Contact Us", href: "/contactUs" },
];

const Navbar = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowTopBar(false);
      } else {
        // Scrolling up
        setShowTopBar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="w-full sticky top-0 z-50">
        <AnimatePresence>
          {showTopBar && (
            <motion.div transition={{ duration: 0.3, ease: "easeInOut" }}>
              <TopBar
                quickLinksLeft={quickLinksLeft}
                quickLinksRight={quickLinksRight}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-[#173FAF] w-full">
          <MainNav />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
