"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroProductHighlight() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center bg-[url('https://i.ibb.co.com/35qDwjLf/showcase-with-smartphones-modern-electronics-store-buy-mobile-phone-many-smartphones-shelf-technolog.jpg')] bg-cover bg-center bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-11/12 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            The Ultimate Gadget Experience
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12">
            Cutting-edge technology, sleek designs, and unbeatable performance.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 flex-wrap">
            <button className="bg-[#00a88f] hover:bg-[#1a7f73] text-white font-semibold px-6 py-3 rounded-lg transition">
              Sign up Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
