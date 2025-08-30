"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import ImageSection from "./ImageSection";

const DetailsTop = ({ product }) => {
  return (
    <section className="pt-5 pb-10 space-y-5">
      <nav
        className="flex items-center space-x-2 text-gray-600 text-sm"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-primary font-medium">
          Home
        </Link>
        <FaChevronRight className="w-4 h-4" />
        <Link href="/allProduct" className="hover:text-primary font-medium">
          Products
        </Link>
        <FaChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-semibold">{product.name}</span>
      </nav>
      <div className="flex flex-col md:flex-row md:space-x-14 max-md:space-y-14">
        <ImageSection images={product?.images} />
      </div>
    </section>
  );
};

export default DetailsTop;
