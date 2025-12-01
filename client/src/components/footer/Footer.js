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
      className="bg-[#173faf] text-white pt-12 pb-6"
    >
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 2xl:gap-20">
        <div className="w-full lg:w-3/5 flex flex-col sm:flex-row max-lg::justify-between gap-16">
          <div className="w-full sm:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Spark Gear
            </h2>
            <p className="mt-4 text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed">
              SparkGear is your go-to place for high-quality tech accessories
              and gadgets. We bring you the latest products with fast delivery
              and excellent support.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <Link
                href="#"
                className="hover:text-gray-100 transition-colors duration-300"
              >
                <FaFacebookF size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-gray-100 transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-gray-100 transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-gray-100 transition-colors duration-300"
              >
                <FaLinkedinIn size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-gray-200 text-sm sm:text-base">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold">Stay Updated</h3>
          <p className="mt-4 text-gray-200 text-sm sm:text-base md:text-lg">
            Subscribe to our newsletter to get the latest products and offers.
          </p>
          <form className="mt-5 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-3 rounded-lg text-gray-900 bg-white w-full sm:flex-1 focus:outline-none text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-white hover:bg-gray-200 text-[#173faf] font-bold px-5 py-3 rounded-lg transition-colors duration-300 text-sm sm:text-base cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-200 text-xs sm:text-sm md:text-base">
        &copy; {new Date().getFullYear()} SparkGear. All rights reserved.
      </div>
    </motion.footer>
  );
}
