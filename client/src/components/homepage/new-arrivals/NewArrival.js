"use client";
import "swiper/css";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import ProductCard from "@/components/card/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";

const NewArrival = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const { products, productIsLoading, productError } = useProducts();

  if (productIsLoading)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 py-12 sm:py-16">
        Loading new arrivals...
      </p>
    );

  if (productError)
    return (
      <p className="text-center text-red-500 dark:text-red-300 py-12 sm:py-16">
        Failed to load products
      </p>
    );

  if (!products || products.length === 0)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 py-12 sm:py-16">
        No new arrivals available
      </p>
    );

  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 10);

  return (
    <section className="w-full">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-left mb-10 sm:mb-12 md:mb-16 text-gray-900 dark:text-white leading-snug">
        New Arrivals
      </h2>

      <div className="relative">
        {/* Navigation Buttons */}
        {!isBeginning && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full bg-[#008080] hover:bg-[#016b6b] shadow-lg transition-all"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FiChevronLeft className="text-2xl sm:text-3xl text-white" />
          </button>
        )}
        {!isEnd && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full bg-[#008080] hover:bg-[#016b6b] shadow-lg transition-all"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FiChevronRight className="text-2xl sm:text-3xl text-white" />
          </button>
        )}

        {/* Swiper */}
        <Swiper
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4 },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="mySwiper py-4"
        >
          {randomProducts.map((product) => (
            <SwiperSlide key={product._id} className="flex justify-center">
              <div className="w-full cursor-pointer">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArrival;
