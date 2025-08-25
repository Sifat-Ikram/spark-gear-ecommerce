"use client";

import { motion } from "framer-motion";
import { FiTruck, FiHeadphones, FiRotateCcw, FiShield } from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: <FiTruck className="text-3xl text-[#00a88f]" />,
    title: "Fast & Free Shipping",
    desc: "Get your gadgets delivered quickly with no extra cost.",
  },
  {
    id: 2,
    icon: <FiHeadphones className="text-3xl text-[#00a88f]" />,
    title: "24/7 Customer Support",
    desc: "Our team is always here to help with your questions.",
  },
  {
    id: 3,
    icon: <FiRotateCcw className="text-3xl text-[#00a88f]" />,
    title: "Easy Returns",
    desc: "Hassle-free 7-day return policy for all purchases.",
  },
  {
    id: 4,
    icon: <FiShield className="text-3xl text-[#00a88f]" />,
    title: "Secure Payments",
    desc: "Your transactions are encrypted and completely safe.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full py-16 bg-[url('https://i.ibb.co/35qDwjLf/showcase-with-smartphones-modern-electronics-store-buy-mobile-phone-many-smartphones-shelf-technolog.jpg')] bg-cover bg-center bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-11/12 mx-auto bg-black/30 rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-10">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 text-white"
        >
          Why Choose Us
        </motion.h2>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-200">
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
