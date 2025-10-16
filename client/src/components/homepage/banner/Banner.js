"use client";

import SplitText from "@/components/animations/SplitText";
import { motion } from "framer-motion";

export default function Banner({ banner }) {
  return (
    <section className="-mt-20 relative h-[80vh] overflow-hidden text-white">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src={banner.video}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* Text content */}
      <div className="w-11/12 mx-auto flex flex-col items-center text-center h-full space-y-10 sm:justify-center max-sm:justify-start max-sm:pt-10">
        <SplitText
          text={banner.title}
          tag="h1"
          className="text-xl sm:text-4xl xl:text-6xl 2xl:text-8xl font-bold"
          splitBy="chars"
          delay={0.1}
          duration={0.8}
        />

        <motion.p
          className="text-base sm:text-lg xl:text-2xl 2xl:text-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {banner.paragraph}
        </motion.p>

        <motion.button
          className="bg-white text-gray-700 hover:text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#143694] transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
}
