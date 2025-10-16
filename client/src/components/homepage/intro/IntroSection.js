"use client";

import Image from "next/image";
import Link from "next/link";

const IntroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-10 md:gap-14 xl:gap-20 2xl:gap-24">
      {/* Left Side: Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-96 lg:h-[400px] 2xl:h-[600px]">
        <Image
          src={
            "https://i.ibb.co.com/h0P412N/man-buying-new-gadget-store-serious-young-male-client-using-smartphone-standing-near-showcase-electr.jpg"
          }
          alt="Sparkear Gadgets"
          fill
          className="object-cover rounded-2xl shadow-lg"
          priority
        />
      </div>

      {/* Right Side: Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
        <h2 className="title-text exo text-left mb-6 sm:mb-8 md:mb-10 text-gray-900 leading-snug">
          Welcome to <span className="text-[#173faf]">Spark Gear</span>
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed subtitle-text roboto">
          Discover the latest and greatest in tech — from powerful laptops and
          smartphones to cameras, keyboards, and accessories. At Sparkear, we
          bring you only the best gadgets to spark your digital lifestyle.
        </p>
        <Link
          href="/main-layout/allProduct"
          className="buttons max-md:w-full md:w-fit"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default IntroSection;
