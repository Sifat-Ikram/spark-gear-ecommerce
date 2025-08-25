"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-[#1a7f73] text-white pt-10 pb-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Brand & Description */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-white text-">Spark Gear</h2>
            <p className="mt-3 text-gray-200 text-sm sm:text-base">
              SparkGear is your go-to place for high-quality tech accessories
              and gadgets. We bring you the latest products with fast delivery
              and excellent support.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <Link
                href="#"
                className="hover:text-white text- transition-colors duration-300"
              >
                <FaFacebookF size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-white text- transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-white text- transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-white text- transition-colors duration-300"
              >
                <FaLinkedinIn size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/2">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-gray-200">
              <li>
                <Link
                  href="/"
                  className="hover:text-white text- transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white text- transition-colors duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white text- transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white text- transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter / Contact */}
        <div className="">
          <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
          <p className="mt-3 text-gray-200 text-sm sm:text-base">
            Subscribe to our newsletter to get the latest products and offers.
          </p>
          <form className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-lg text-gray-900 bg-white w-full sm:flex-1 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-[#00876f] hover:bg-[#00876f] hover:text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} SparkGear. All rights reserved.
      </div>
    </motion.footer>
  );
}
