"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroProductHighlight() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center gap-10">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 mb-4">
            The Ultimate Gadget Experience
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700/90 mb-12">
            Cutting-edge technology, sleek designs, and unbeatable performance.
          </p>
          <Link href={"/register"} className="flex justify-center lg:justify-start gap-4 flex-wrap">
            <button className="buttons">
              Sign up Today
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Right Side: Content */}
      <div className="relative w-full md:w-1/2 h-64 md:h-96">
        <Image
          src={
            "https://i.ibb.co.com/35qDwjLf/showcase-with-smartphones-modern-electronics-store-buy-mobile-phone-many-smartphones-shelf-technolog.jpg"
          }
          alt="Sparkear Gadgets"
          fill
          className="object-cover rounded-2xl shadow-lg"
          priority
        />
      </div>
    </section>
  );
}
