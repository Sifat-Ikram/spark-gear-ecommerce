"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const AppDownload = () => {
  return (
    <section className="relative w-full py-16 bg-[url('https://i.ibb.co.com/Z1Fn3kqN/istockphoto-1165052026-612x612.jpg')] bg-cover bg-center bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-11/12 mx-auto bg-black/30 rounded-2xl p-6 md:p-10 text-center">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="title-text exo mb-6"
            style={{ color: "white" }}
          >
            Download Our Mobile App
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="subtitle-text roboto md:text-lg mb-14"
            style={{ color: "white" }}
          >
            Shop smarter, track your orders, and get exclusive deals — all from
            the convenience of your phone.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 
             xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-6 2xl:gap-8"
        >
          {/* Google Play Button */}
          <Link href="#" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 
                 text-sm xs:text-base sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl 
                 px-5 xs:px-6 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-10 
                 py-2 xs:py-3 sm:py-3 md:py-4 lg:py-4 xl:py-5 2xl:py-5 
                 bg-[#173faf] text-white rounded-xl font-semibold shadow-md 
                 hover:bg-[#143694] transition cursor-pointer"
            >
              <FaGooglePlay className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl" />
              Google Play
            </motion.div>
          </Link>

          {/* App Store Button */}
          <Link href="#" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 
                 text-sm xs:text-base sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl 
                 px-5 xs:px-6 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-10 
                 py-2 xs:py-3 sm:py-3 md:py-4 lg:py-4 xl:py-5 2xl:py-5 
                 bg-white text-black rounded-xl font-semibold shadow-md 
                 hover:bg-gray-300 transition cursor-pointer"
            >
              <FaApple className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl" />
              App Store
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AppDownload;
