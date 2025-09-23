"use client";
import { motion } from "framer-motion";

export default function Cover({ title, subtitle, bgImage }) {
  return (
    <section
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-cover bg-center bg-fixed flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 w-4/5 mx-auto space-y-4 lg:space-y-8 2xl:space-y-12"
      >
        <h1 className="text-2xl sm:text-4xl lg:text-6xl 2xl:text-7xl font-bold exo text-white drop-shadow-lg">
          {title}
        </h1>
        <p className="text-sm sm:text-lg lg:text-2xl 2xl:text-4xl roboto text-white/90 leading-relaxed drop-shadow-md">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}
