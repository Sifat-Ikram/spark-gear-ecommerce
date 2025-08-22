"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import SearchOverlay from "./SearchOverlay";
import { usePathname } from "next/navigation";
import { useAuth } from "@/provider/AuthContext";

const Navbar = () => {
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const quickLinkRef = useRef(null);
  const searchRef = useRef(null);
  const [showTopBar, setShowTopBar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const pathname = usePathname();

  const transparentRoutes = ["/"];
  const isTransparent = transparentRoutes.includes(pathname);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };
  const toggleQuickLink = () => {
    setShowQuickLinks((prev) => !prev);
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

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

  const navItems = [
    {
      label: "Admissions",
      dropdown: [
        { label: "Overview", href: "/admission/overview" },
        { label: "How to Apply", href: "/admission/howToApply" },
        { label: "Tuition & Fees", href: "/admission/tuitionFee" },
        { label: "Scholarships & Aid", href: "/admission/scholarships" },
        { label: "International Students", href: "/admission/international" },
      ],
    },
    {
      label: "Academics",
      dropdown: [
        { label: "Undergraduate", href: "/academics/undergraduate" },
        { label: "Graduate", href: "/academics/graduate" },
        { label: "Course Catalog", href: "/academics/course-catelog" },
        { label: "Research Opportunities", href: "/academics/research" },
        { label: "Registration", href: "/academics/registration" },
      ],
    },
    {
      label: "Events",
      dropdown: [
        { label: "All Events", href: "/events/calendar" },
        { label: "Academic Events", href: "/events/academic" },
        { label: "Student Club Events", href: "/events/student-clubs" },
        { label: "Workshops & Seminars", href: "/events/workshops" },
      ],
    },
    {
      label: "About",
      dropdown: [
        { label: "University", href: "/about/university" },
        { label: "Leadership", href: "/about/leadership" },
        { label: "Campus & Facilities", href: "/about/campus" },
        { label: "Accreditations", href: "/about/accreditations" },
        { label: "Alumni Stories", href: "/about/alumni-testimonials" },
      ],
    },
    {
      label: "Contact",
      dropdown: [
        { label: "General Inquiries", href: "/contact/general" },
        { label: "Admissions Office", href: "/contact/admissions" },
        { label: "Registrar’s Office", href: "/contact/registrar" },
        { label: "Campus Map", href: "/contact/map" },
        { label: "Careers", href: "/contact/careers" },
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (mobileMenuRef.current?.contains(target)) return;
      if (menuOpen) {
        setMenuOpen(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setOpenDropdownIndex(null);
      }

      if (quickLinkRef.current && !quickLinkRef.current.contains(target)) {
        setShowQuickLinks(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBar(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <nav
        className={`top-0 w-full left-0 
          ${isTransparent ? "fixed" : "sticky"}
          `}
        style={{ zIndex: 9999 }}
      >
        <div className="flex flex-col">
          <div
            className={`bg-[#1A7F73] hidden sm:block dark:bg-[#161929] shadow-md text-white w-full  py-1 sm:py-2
             ${
               showTopBar
                 ? isTransparent
                   ? "translate-y-0"
                   : "hidden"
                 : "? isTransparent"
             } transition-transform duration-300 ease-in-out
            `}
          >
            <div className="w-11/12 mx-auto">
              <div className="flex justify-between w-full">
                <div className="flex items-center space-x-4">
                  {quickLinksLeft?.map((links) => (
                    <Link
                      key={links.id}
                      href={links.href}
                      className="hover:underline hover:text-gray-200 text-xs lg:text-sm xl:text-sm 2xl:text-base"
                    >
                      {links.label}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  {quickLinksRight?.map((links) => (
                    <Link
                      key={links.id}
                      href={links.href}
                      className="hover:underline hover:text-gray-200 text-xs lg:text-sm xl:text-sm 2xl:text-base"
                    >
                      {links.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-full  relative transition-all duration-300 ${
              showTopBar
                ? isTransparent
                  ? "translate-y-0 bg-transparent shadow backdrop-blur-sm"
                  : "translate-y-0 bg-[#00A88F] dark:bg-[#161929] shadow"
                : "-translate-y-[45px] md:-translate-y-[58px] bg-[#00A88F] text-gray-950 dark:bg-[#161929] shadow mt-5"
            }`}
          >
            <div className="w-11/12 mx-auto flex justify-between items-center shadow">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <span
                  className={`exo text-4xl font-extrabold
                  ${
                    showTopBar
                      ? isTransparent
                        ? "text-white dark:text-white dark:hover:text-white"
                        : "dark:text-white text-white bg- dark:hover:text-white"
                      : "dark:text-white dark:hover:text-white text-white"
                  }
                  `}
                >
                  SparkGear
                </span>
              </Link>
              <div>
                <div
                  ref={dropdownRef}
                  className="hidden md:flex items-center justify-center paragraph-text space-x-4 relative"
                >
                  {navItems.map((item) =>
                    item.dropdown ? (
                      <div
                        className="relative group hover:cursor-pointer"
                        key={item?.label}
                      >
                        <button
                          className={`cursor-pointer transition-colors duration-200
                          ${
                            showTopBar
                              ? isTransparent
                                ? "text-white font-medium py-[2px] sm:py-1 lg:py-[14px]"
                                : "dark:text-white text-white font-medium py-[2px] sm:py-1 lg:py-[14px]"
                              : "dark:text-white text-white font-medium py-[2px] sm:py-1 lg:py-[14px]"
                          }
                          `}
                        >
                          {item.label}
                        </button>
                        {/* Dropdown Menu */}
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 group-hover:block hidden
                                     group-last:left-auto group-last:right-0 group-last:translate-x-0 z-50 w-max
                                     bg-[#00A88F] rounded-md dark:bg-[#161929] shadow-xl transition-all duration-300 ease-out animate-fadeInUp"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="block text-gray-100 dark:text-gray-100 hover:bg-white hover:text-gray-800 dark:hover:text-gray-800 text-nowrap rounded px-5 py-2 transition-colors duration-200"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div
                        key={item.label}
                        className="text-white font-medium dark:bg-[#161929] dark:bprder-b-2 border-white"
                      >
                        {item.label}
                      </div>
                    )
                  )}

                  <div
                    className={`flex items-center space-x-4 px-4 py-1 bg-white/30 rounded-md backdrop-blur-md text-white/90 transition-all duration-300
    ${
      showTopBar
        ? "backdrop-blur-md text-white/80 hover:text-white"
        : "dark:bg-white/20 dark:text-white"
    }
  `}
                  >
                    {/* Search Icon */}
                    <button
                      ref={searchRef}
                      onClick={toggleSearch}
                      aria-label="Open search"
                      className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded"
                    >
                      <FiSearch size={20} />
                    </button>

                    {/* Divider */}
                    <div className="border-l border-white/50 h-5" />

                    {/* Login / Logout */}
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded font-medium"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        href="/auth/login"
                        className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded font-medium"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                </div>

                {/* Mobile Hamburger */}
                <div className="flex items-center space-x-2 sm:space-x-3 md:hidden">
                  <button
                    ref={searchRef}
                    onClick={toggleSearch}
                    className="text-white dark:text-white"
                  >
                    <FiSearch className="font-black text-xl sm:text-2xl cursor-pointer" />
                  </button>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-white dark:text-white focus:outline-none py-5 cursor-pointer"
                  >
                    {menuOpen ? (
                      <FaTimes className="font-black text-xl sm:text-2xl cursor-pointer" />
                    ) : (
                      <FaBars className="font-black text-xl sm:text-2xl cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className={`md:hidden bg-[#00A88F] dark:bg-[#161929] shadow-lg py-1 absolute z-50 w-32 sm:w-40 text-center sm:text-right right-0
              ${
                showTopBar && isTransparent
                  ? "top-[80px]"
                  : "top-[40px] sm:top-[48px]"
              }
              `}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {navItems.map((item, index) => (
              <div key={item.label} className="group">
                <h1
                  className={`
            block text-white hover:cursor-pointer px-2 sm:px-5 py-3 
            ${
              index === 0
                ? "border-b-[0.050px] border-transparent hover:border-white"
                : ""
            }
            ${
              index !== 0
                ? "border-y-[0.050px] border-transparent hover:border-white"
                : ""
            }
            transition-all duration-300 ease-in-out
          `}
                  onClick={() => toggleDropdown(index)}
                >
                  {item.label}
                </h1>

                {item.dropdown && openDropdownIndex === index && (
                  <motion.div
                    className="absolute z-50 right-[129px] sm:right-[160.50px] top-[18px] bg-[#00A88F] dark:bg-[#161929] group-hover:block shadow-lg rounded-md w-auto space-y-2 py-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(false);
                          setOpenDropdownIndex(null);
                        }}
                        className="block text-white px-2 sm:px-5 hover:cursor-pointer text-nowrap"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {user ? (
              <>
                <Link href="/" className="text-white">
                  <h1
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="block text-white hover:cursor-pointer px-2 sm:px-5 py-3 border-y-[0.050px] border-transparent hover:border-white"
                  >
                    Logout
                  </h1>
                </Link>
              </>
            ) : (
              <div className="flex flex-col sm:hidden">
                <Link href="/auth/login" className="text-white">
                  <h1
                    onClick={() => setMenuOpen(false)}
                    className="block text-white hover:cursor-pointer px-2 sm:px-5 py-3 border-y-[0.050px] border-transparent hover:border-white"
                  >
                    Login
                  </h1>
                </Link>
                <Link href="/auth/register" className="text-white">
                  <h1
                    onClick={() => setMenuOpen(false)}
                    className="block text-white hover:cursor-pointer px-2 sm:px-5 py-3 border-t-[0.050px] border-transparent hover:border-white"
                  >
                    Register
                  </h1>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </nav>
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};

export default Navbar;
