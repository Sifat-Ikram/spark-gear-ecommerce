"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/provider/AuthContext";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";

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
      { label: "Course Catalog", href: "/academics/course-catalog" },
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

const Navbar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);

  const transparentRoutes = ["/"];
  const isTransparent = transparentRoutes.includes(pathname);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const handleScroll = () => setShowTopBar(window.scrollY === 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`top-5 w-full left-0 ${
          isTransparent ? "fixed" : "sticky"
        } z-40`}
      >
        <div className="flex flex-col">
          {isTransparent && showTopBar && (
            <TopBar
              quickLinksLeft={quickLinksLeft}
              quickLinksRight={quickLinksRight}
            />
          )}
          <MainNav
            navItems={navItems}
            user={user}
            showTopBar={showTopBar}
            isTransparent={isTransparent}
            toggleSearch={() => setShowSearch((prev) => !prev)}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            handleLogout={handleLogout}
          />
          <MobileMenu
            navItems={navItems}
            user={user}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            handleLogout={handleLogout}
          />
        </div>
      </nav>

      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};

export default Navbar;
