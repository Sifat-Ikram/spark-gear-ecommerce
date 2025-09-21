"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroProductHighlight() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 3xl:gap-32 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 3xl:py-40 w-11/12 mx-auto">
      {/* Left Side: Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="title-text text-gray-700 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-10 3xl:mb-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold leading-snug">
            The Ultimate Gadget Experience
          </h2>
          <p className="roboto text-gray-700/90 mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 3xl:mb-24 text-sm sm:text-base lg:text-xl 2xl:text-2xl 3xl:text-4xl leading-relaxed">
            Discover cutting-edge technology designed to elevate your daily
            life. Our premium gadgets combine sleek, modern designs with
            unbeatable performance, ensuring every interaction feels intuitive,
            fast, and effortless. Experience innovation at its finest and make
            every moment more productive, fun, and connected.
          </p>
          <Link
            href={"/register"}
            className="flex justify-center md:justify-start flex-wrap"
          >
            <button className="buttons text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl 3xl:text-3xl px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 2xl:px-16 3xl:px-20 py-3 sm:py-4 md:py-4 lg:py-5 xl:py-5 2xl:py-6 3xl:py-6">
              Sign up Today
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Right Side: Image */}
      <div className="relative w-full md:w-1/2 h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] 3xl:h-[36rem]">
        <Image
          src={
            "https://i.ibb.co/35qDwjLf/showcase-with-smartphones-modern-electronics-store-buy-mobile-phone-many-smartphones-shelf-technolog.jpg"
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
