"use client";

import { motion } from "framer-motion";
import { FiTruck, FiHeadphones, FiRotateCcw, FiShield } from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: (
      <FiTruck className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-7xl text-white" />
    ),
    title: "Fast & Free Shipping",
    desc: "Get your gadgets delivered quickly with no extra cost.",
  },
  {
    id: 2,
    icon: (
      <FiHeadphones className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-7xl text-white" />
    ),
    title: "24/7 Customer Support",
    desc: "Our team is always here to help with your questions.",
  },
  {
    id: 3,
    icon: (
      <FiRotateCcw className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-7xl text-white" />
    ),
    title: "Easy Returns",
    desc: "Hassle-free 7-day return policy for all purchases.",
  },
  {
    id: 4,
    icon: (
      <FiShield className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-7xl text-white" />
    ),
    title: "Secure Payments",
    desc: "Your transactions are encrypted and completely safe.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 2xl:py-36 3xl:py-44 bg-[url('https://i.ibb.co/35qDwjLf/showcase-with-smartphones-modern-electronics-store-buy-mobile-phone-many-smartphones-shelf-technolog.jpg')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 w-11/12 max-w-[1600px] mx-auto bg-black/30 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16 3xl:p-20">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{color: "white"}}
          className="exo title-text text-white text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 3xl:mb-24"
        >
          Why Choose Us
        </motion.h2>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-y-8 sm:gap-y-10 md:gap-y-12 lg:gap-y-14 xl:gap-y-16 gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 xl:gap-x-14 2xl:gap-x-16 3xl:gap-x-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4 sm:space-x-5 md:space-x-6 lg:space-x-6 xl:space-x-8 2xl:space-x-10 3xl:space-x-12 p-4 sm:p-5 md:p-6 lg:p-6 xl:p-8 2xl:p-10 3xl:p-12 transition-transform duration-300"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl 3xl:text-3xl mb-1">
                  {feature.title}
                </h3>
                <p className="roboto text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl text-gray-200">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
