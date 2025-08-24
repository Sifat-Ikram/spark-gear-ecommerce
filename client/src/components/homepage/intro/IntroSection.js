"use client";

import Image from "next/image";
import Link from "next/link";

const IntroSection = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center gap-10">
      {/* Left Side: Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-96">
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to <span className="text-[#00a88f]">Spark Gear</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Discover the latest and greatest in tech — from powerful laptops and
          smartphones to cameras, keyboards, and accessories. At Sparkear, we
          bring you only the best gadgets to spark your digital lifestyle.
        </p>
        <Link href="/shop" className="buttons max-md:w-full md:w-fit">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default IntroSection;
