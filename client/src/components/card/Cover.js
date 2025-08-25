"use client";
import { motion } from "framer-motion";

export default function Cover({ title }) {
  return (
    <section className="relative w-full py-16 bg-[url('https://i.ibb.co.com/Z1Fn3kqN/istockphoto-1165052026-612x612.jpg')] bg-cover bg-center bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center text-white px-6 py-2 rounded-lg"
      >
        {title}
      </motion.h1>
    </section>
  );
}
