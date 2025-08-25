"use client";

import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const AppDownload = () => {
  return (
    <section className="relative w-full py-16 bg-[url('https://i.ibb.co.com/Z1Fn3kqN/istockphoto-1165052026-612x612.jpg')] bg-cover bg-center bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-11/12 mx-auto bg-black/30 rounded-2xl p-6 md:p-10 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6"
        >
          Download Our Mobile App
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-200 text-base md:text-lg mb-8 max-w-2xl mx-auto"
        >
          Shop smarter, track your orders, and get exclusive deals — all from
          the convenience of your phone.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#"
            className="flex items-center justify-center gap-2 bg-[#00a88f] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#008f79] transition"
          >
            <FaGooglePlay className="text-xl" /> Google Play
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-200 transition"
          >
            <FaApple className="text-xl" /> App Store
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AppDownload;
